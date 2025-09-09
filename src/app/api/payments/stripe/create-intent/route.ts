import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripePaymentIntentSchema } from "@/lib/validations/cart";
import { PaymentService } from "@/lib/services/payment-service";

/**
 * @swagger
 * /api/payments/stripe/create-intent:
 *   post:
 *     summary: Create Stripe payment intent
 *     description: Creates a Stripe payment intent for an order
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: Order ID to create payment for
 *     responses:
 *       200:
 *         description: Payment intent created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 paymentId:
 *                   type: string
 *                 stripePaymentIntentId:
 *                   type: string
 *                 clientSecret:
 *                   type: string
 *                 requiresAction:
 *                   type: boolean
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = stripePaymentIntentSchema.parse(body);

    const paymentService = new PaymentService();

    // Get order details
    const { prisma } = await import("@/lib/prisma");
    const order = await prisma.order.findUnique({
      where: { id: validatedData.orderId },
      select: {
        id: true,
        total: true,
        customerEmail: true,
        customerName: true,
        customerId: true,
        paymentStatus: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Check if user owns this order or is admin
    if (order.customerId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    if (order.paymentStatus === "PAID") {
      return NextResponse.json(
        { error: "Order is already paid" },
        { status: 400 }
      );
    }

    const result = await paymentService.createStripePaymentIntent(
      order.id,
      order.total,
      order.customerEmail,
      order.customerName
    );

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      paymentId: result.paymentId,
      stripePaymentIntentId: result.stripePaymentIntentId,
      clientSecret: result.clientSecret,
      requiresAction: result.requiresAction,
    });
  } catch (error) {
    console.error("Create Stripe payment intent error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
