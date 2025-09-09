import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/admin/reports:
 *   get:
 *     summary: Get financial reports
 *     description: Retrieve financial reports including revenue, expenses, and net profit (admin only)
 *     tags: [Admin, Reports]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the report (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the report (YYYY-MM-DD)
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [json, csv]
 *         description: Response format
 *     responses:
 *       200:
 *         description: Reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: object
 *                   properties:
 *                     totalRevenue:
 *                       type: number
 *                     stripeRevenue:
 *                       type: number
 *                     codRevenue:
 *                       type: number
 *                     totalExpenses:
 *                       type: number
 *                     netProfit:
 *                       type: number
 *                     totalOrders:
 *                       type: number
 *                     stripeOrders:
 *                       type: number
 *                     codOrders:
 *                       type: number
 *                 dailyData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       revenue:
 *                         type: number
 *                       expenses:
 *                         type: number
 *                       netProfit:
 *                         type: number
 *                       orders:
 *                         type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const format = searchParams.get("format") || "json";

    // Default to last 30 days if no dates provided
    const end = endDate ? new Date(endDate) : new Date();
    const start = startDate
      ? new Date(startDate)
      : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Get completed orders with payments
    const orders = await prisma.order.findMany({
      where: {
        status: "COMPLETED",
        paymentStatus: "PAID",
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      include: {
        payments: {
          where: {
            status: "PAID",
          },
        },
      },
    });

    // Get expenses in the same period
    const expenses = await prisma.expense.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    // Calculate summary
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const stripeOrders = orders.filter(
      (order) => order.paymentMethod === "CARD"
    );
    const codOrders = orders.filter((order) => order.paymentMethod === "COD");
    const stripeRevenue = stripeOrders.reduce(
      (sum, order) => sum + order.total,
      0
    );
    const codRevenue = codOrders.reduce((sum, order) => sum + order.total, 0);
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    const netProfit = totalRevenue - totalExpenses;

    // Calculate daily data
    const dailyData = [];
    const currentDate = new Date(start);

    while (currentDate <= end) {
      const dayStart = new Date(currentDate);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(currentDate);
      dayEnd.setHours(23, 59, 59, 999);

      const dayOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= dayStart && orderDate <= dayEnd;
      });

      const dayExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.createdAt);
        return expenseDate >= dayStart && expenseDate <= dayEnd;
      });

      const dayRevenue = dayOrders.reduce((sum, order) => sum + order.total, 0);
      const dayExpenseAmount = dayExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );
      const dayNetProfit = dayRevenue - dayExpenseAmount;

      dailyData.push({
        date: currentDate.toISOString().split("T")[0],
        revenue: dayRevenue,
        expenses: dayExpenseAmount,
        netProfit: dayNetProfit,
        orders: dayOrders.length,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    const summary = {
      totalRevenue,
      stripeRevenue,
      codRevenue,
      totalExpenses,
      netProfit,
      totalOrders: orders.length,
      stripeOrders: stripeOrders.length,
      codOrders: codOrders.length,
    };

    if (format === "csv") {
      // Generate CSV
      const csvHeaders = "Date,Revenue,Expenses,Net Profit,Orders\n";
      const csvRows = dailyData
        .map(
          (day) =>
            `${day.date},${day.revenue / 100},${day.expenses / 100},${
              day.netProfit / 100
            },${day.orders}`
        )
        .join("\n");

      const csv = csvHeaders + csvRows;

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="financial-report-${
            start.toISOString().split("T")[0]
          }-to-${end.toISOString().split("T")[0]}.csv"`,
        },
      });
    }

    return NextResponse.json({
      summary,
      dailyData,
    });
  } catch (error) {
    console.error("Get reports error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve reports" },
      { status: 500 }
    );
  }
}
