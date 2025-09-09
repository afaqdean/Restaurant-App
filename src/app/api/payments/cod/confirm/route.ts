import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { codPaymentConfirmationSchema } from "@/lib/validations/cart";
import { PaymentService } from "@/lib/services/payment-service";

/**
 * @swagger
 * /api/payments/cod/confirm:
 *   post:
 *     summary: Confirm COD payment
 *     description: Confirms a Cash on Delivery payment (admin only)
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
 *                 description: Order ID
 *               confirmed:
 *                 type: boolean
 *                 description: Whether payment is confirmed
 *     responses:
 *       200:
 *         description: COD payment confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = codPaymentConfirmationSchema.parse(body);

    if (!validatedData.confirmed) {
      return NextResponse.json({
        success: true,
        message: "COD payment not confirmed",
      });
    }

    const paymentService = new PaymentService();

    // Find the COD payment for this order
    const { prisma } = await import("@/lib/prisma");
    const payment = await prisma.payment.findFirst({
      where: {
        orderId: validatedData.orderId,
        provider: "COD",
        status: "UNPAID",
      },
    });

    if (!payment) {
      return NextResponse.json(
        { error: "COD payment not found or already processed" },
        { status: 404 }
      );
    }

    const result = await paymentService.confirmCodPayment(
      payment.id,
      session.user.id
    );

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "COD payment confirmed successfully",
    });
  } catch (error) {
    console.error("Confirm COD payment error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to confirm COD payment" },
      { status: 500 }
    );
  }
}
