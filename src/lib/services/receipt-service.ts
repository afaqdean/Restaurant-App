import { Order } from "@prisma/client";
import puppeteer from "puppeteer";
import { readFileSync } from "fs";
import { join } from "path";

export interface OrderWithDetails extends Order {
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    notes?: string;
    item: {
      id: string;
      name: string;
      description?: string;
    };
    options: Array<{
      id: string;
      price: number;
      option: {
        id: string;
        name: string;
      };
    }>;
  }>;
  payments: Array<{
    id: string;
    provider: string;
    status: string;
    amount: number;
    createdAt: Date;
  }>;
  coupons: Array<{
    id: string;
    discount: number;
    coupon: {
      id: string;
      code: string;
      type: string;
    };
  }>;
}

export class ReceiptService {
  private formatPrice(cents: number): string {
    return `$${(cents / 100).toFixed(2)}`;
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  async generateReceiptPDF(order: OrderWithDetails): Promise<Buffer> {
    let browser;

    try {
      console.log("Creating PDF document with Puppeteer...");
      console.log("Order data:", {
        orderNumber: order.orderNumber,
        itemsCount: order.items?.length || 0,
      });

      // Calculate totals
      const subtotal =
        order.items?.reduce((sum, item) => {
          const itemPrice =
            item.price +
            item.options.reduce((optSum, opt) => optSum + opt.price, 0);
          return sum + itemPrice * item.quantity;
        }, 0) || 0;

      const totalDiscount =
        order.coupons?.reduce((sum, coupon) => sum + coupon.discount, 0) || 0;
      const afterDiscount = subtotal - totalDiscount;
      const taxRate = 0.085;
      const serviceFeeRate = 0.03;
      const tax = afterDiscount * taxRate;
      const serviceFee = afterDiscount * serviceFeeRate;
      const total = afterDiscount + tax + serviceFee;

      // Prepare data for the template
      const receiptData = {
        orderNumber: order.orderNumber,
        date: this.formatDate(order.createdAt),
        status: order.status,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        customerName: order.customerName || "N/A",
        customerEmail: order.customerEmail || "N/A",
        customerPhone: order.customerPhone || "N/A",
        items: order.items || [],
        subtotal: subtotal,
        totalDiscount: totalDiscount,
        tax: tax,
        serviceFee: serviceFee,
        total: total,
        payments: order.payments || [],
      };

      console.log(
        "Receipt data being sent:",
        JSON.stringify(receiptData, null, 2)
      );
      console.log("Order items from database:", order.items);

      // Launch Puppeteer
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();

      // Read the HTML template
      const templatePath = join(
        process.cwd(),
        "src",
        "lib",
        "templates",
        "receipt-template.html"
      );
      const htmlTemplate = readFileSync(templatePath, "utf8");

      // Inject the data into the HTML
      const htmlWithData = htmlTemplate.replace(
        "<script>",
        `<script>
          window.receiptData = ${JSON.stringify(receiptData)};
        </script>
        <script>`
      );

      // Set the HTML content
      await page.setContent(htmlWithData, { waitUntil: "networkidle0" });

      // Generate PDF
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "0.4in",
          right: "0.4in",
          bottom: "0.4in",
          left: "0.4in",
        },
      });

      console.log("PDF generation completed successfully");
      return Buffer.from(pdf);
    } catch (error) {
      console.error("Receipt generation error:", error);
      throw error;
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
