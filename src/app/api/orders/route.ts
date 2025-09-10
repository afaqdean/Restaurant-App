import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { OrderService } from "@/lib/services/order-service";
import { OrderStatus } from "@/types/order";

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get orders
 *     description: Get orders for the current user or all orders (admin)
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of orders to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of orders to skip
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, ACCEPTED, IN_KITCHEN, READY, COMPLETED, CANCELLED]
 *         description: Filter by order status
 *       - in: query
 *         name: paymentMethod
 *         schema:
 *           type: string
 *           enum: [CARD, COD, CASH]
 *         description: Filter by payment method
 *       - in: query
 *         name: paymentStatus
 *         schema:
 *           type: string
 *           enum: [PAID, UNPAID]
 *         description: Filter by payment status
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *                 totalCount:
 *                   type: integer
 *                   description: Total number of orders matching the filters
 *                 hasMore:
 *                   type: boolean
 *                   description: Whether there are more orders available
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");
    const statusParam = searchParams.get("status");
    const paymentMethodParam = searchParams.get("paymentMethod");
    const paymentStatusParam = searchParams.get("paymentStatus");
    const status = statusParam as OrderStatus | "CART" | undefined;
    const paymentMethod = paymentMethodParam || undefined;
    const paymentStatus = paymentStatusParam || undefined;

    const orderService = new OrderService();

    let result;
    if (session.user.role === "ADMIN") {
      result = await orderService.getAllOrders(
        limit,
        offset,
        status,
        paymentMethod,
        paymentStatus
      );
    } else {
      const orders = await orderService.getCustomerOrders(
        session.user.id,
        limit,
        offset
      );
      result = {
        orders,
        totalCount: orders.length,
        hasMore: false,
      };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve orders" },
      { status: 500 }
    );
  }
}
