import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { PaymentResult } from "@/types/cart";
import { AuditService } from "./audit-service";

export class PaymentService {
  private stripe: Stripe;
  private auditService: AuditService;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-08-27.basil",
    });
    this.auditService = new AuditService();
  }

  /**
   * Create Stripe payment intent
   */
  async createStripePaymentIntent(
    orderId: string,
    amount: number,
    customerEmail: string,
    customerName: string
  ): Promise<PaymentResult> {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        select: { orderNumber: true, total: true },
      });

      if (!order) {
        return { success: false, error: "Order not found" };
      }

      if (order.total !== amount) {
        return { success: false, error: "Amount mismatch" };
      }

      // Create payment intent
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        metadata: {
          orderId,
          orderNumber: order.orderNumber,
          customerName,
          customerEmail,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      // Create payment record
      const payment = await prisma.payment.create({
        data: {
          orderId,
          provider: "STRIPE",
          amount,
          status: "UNPAID",
          stripePaymentId: paymentIntent.id,
          metadata: {
            payment_intent_id: paymentIntent.id,
            client_secret: paymentIntent.client_secret || null,
          },
        },
      });

      return {
        success: true,
        paymentId: payment.id,
        stripePaymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret || undefined,
        requiresAction: paymentIntent.status === "requires_action",
      };
    } catch (error) {
      console.error("Create Stripe payment intent error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create payment intent",
      };
    }
  }

  /**
   * Confirm Stripe payment
   */
  async confirmStripePayment(paymentIntentId: string): Promise<PaymentResult> {
    try {
      // Retrieve payment intent from Stripe
      const paymentIntent = await this.stripe.paymentIntents.retrieve(
        paymentIntentId
      );

      if (paymentIntent.status === "succeeded") {
        // Update payment status in database
        const payment = await prisma.payment.findFirst({
          where: { stripePaymentId: paymentIntentId },
          include: { order: true },
        });

        if (payment) {
          await prisma.payment.update({
            where: { id: payment.id },
            data: { status: "PAID" },
          });

          await prisma.order.update({
            where: { id: payment.orderId },
            data: { paymentStatus: "PAID" },
          });

          // Create audit log
          await prisma.auditLog.create({
            data: {
              orderId: payment.orderId,
              action: "PAYMENT_CONFIRMED",
              newValue: JSON.stringify({
                paymentId: payment.id,
                amount: payment.amount,
                provider: "STRIPE",
              }),
            },
          });

          return { success: true, paymentId: payment.id };
        }
      }

      return {
        success: false,
        error: `Payment not completed. Status: ${paymentIntent.status}`,
      };
    } catch (error) {
      console.error("Confirm Stripe payment error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to confirm payment",
      };
    }
  }

  /**
   * Handle Stripe webhook
   */
  async handleStripeWebhook(
    event: Stripe.Event
  ): Promise<{ success: boolean; error?: string }> {
    try {
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object as Stripe.PaymentIntent;
          const result = await this.confirmStripePayment(paymentIntent.id);
          return { success: result.success, error: result.error };

        case "payment_intent.payment_failed":
          const failedPayment = event.data.object as Stripe.PaymentIntent;
          await this.handlePaymentFailure(failedPayment.id);
          return { success: true };

        default:
          console.log(`Unhandled event type: ${event.type}`);
          return { success: true };
      }
    } catch (error) {
      console.error("Handle Stripe webhook error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to handle webhook",
      };
    }
  }

  /**
   * Handle payment failure
   */
  private async handlePaymentFailure(paymentIntentId: string): Promise<void> {
    try {
      const payment = await prisma.payment.findFirst({
        where: { stripePaymentId: paymentIntentId },
        include: { order: true },
      });

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: "UNPAID" },
        });

        await prisma.order.update({
          where: { id: payment.orderId },
          data: { paymentStatus: "UNPAID" },
        });

        // Create audit log
        await prisma.auditLog.create({
          data: {
            orderId: payment.orderId,
            action: "PAYMENT_FAILED",
            newValue: JSON.stringify({
              paymentId: payment.id,
              stripePaymentId: paymentIntentId,
            }),
          },
        });
      }
    } catch (error) {
      console.error("Handle payment failure error:", error);
    }
  }

  /**
   * Create COD payment record
   */
  async createCodPayment(orderId: string): Promise<PaymentResult> {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        select: { total: true },
      });

      if (!order) {
        return { success: false, error: "Order not found" };
      }

      const payment = await prisma.payment.create({
        data: {
          orderId,
          provider: "COD",
          amount: order.total,
          status: "UNPAID",
        },
      });

      return {
        success: true,
        paymentId: payment.id,
      };
    } catch (error) {
      console.error("Create COD payment error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to create COD payment",
      };
    }
  }

  /**
   * Confirm COD payment (admin action)
   */
  async confirmCodPayment(
    paymentId: string,
    userId?: string
  ): Promise<PaymentResult> {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: { order: true },
      });

      if (!payment) {
        return { success: false, error: "Payment not found" };
      }

      if (payment.provider !== "COD") {
        return { success: false, error: "Payment is not COD" };
      }

      await prisma.payment.update({
        where: { id: paymentId },
        data: { status: "PAID" },
      });

      await prisma.order.update({
        where: { id: payment.orderId },
        data: { paymentStatus: "PAID" },
      });

      // Create audit log
      await this.auditService.logCodPaymentConfirmation(
        payment.orderId,
        userId || "system"
      );

      return { success: true, paymentId: payment.id };
    } catch (error) {
      console.error("Confirm COD payment error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to confirm COD payment",
      };
    }
  }

  /**
   * Refund payment
   */
  async refundPayment(
    paymentId: string,
    userId?: string
  ): Promise<PaymentResult> {
    try {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
        include: { order: true },
      });

      if (!payment) {
        return { success: false, error: "Payment not found" };
      }

      if (payment.status !== "PAID") {
        return { success: false, error: "Payment is not paid" };
      }

      // Handle Stripe refund
      if (payment.provider === "STRIPE" && payment.stripePaymentId) {
        try {
          await this.stripe.refunds.create({
            payment_intent: payment.stripePaymentId,
          });
        } catch (stripeError) {
          console.error("Stripe refund error:", stripeError);
          // Continue with database update even if Stripe refund fails
        }
      }

      // Update payment status
      await prisma.payment.update({
        where: { id: paymentId },
        data: { status: "REFUNDED" },
      });

      await prisma.order.update({
        where: { id: payment.orderId },
        data: { paymentStatus: "REFUNDED" },
      });

      // Create audit log
      await prisma.auditLog.create({
        data: {
          orderId: payment.orderId,
          action: "PAYMENT_REFUNDED",
          newValue: JSON.stringify({
            paymentId: payment.id,
            amount: payment.amount,
            provider: payment.provider,
            refundedBy: userId,
          }),
          userId,
        },
      });

      return { success: true, paymentId: payment.id };
    } catch (error) {
      console.error("Refund payment error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to refund payment",
      };
    }
  }
}
