import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PaymentService } from "@/lib/services/payment-service";
import { z } from "zod";

const confirmPaymentSchema = z.object({
  paymentIntentId: z.string().min(1, "Payment intent ID is required"),
});

/**
 * @swagger
 * /api/payments/stripe/confirm:
 *   post:
 *     summary: Confirm Stripe payment
 *     description: Confirms a Stripe payment intent
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentIntentId:
 *                 type: string
 *                 description: Stripe payment intent ID
 *     responses:
 *       200:
 *         description: Payment confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 paymentId:
 *                   type: string
 *       400:
 *         description: Invalid request data or payment not completed
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
    const validatedData = confirmPaymentSchema.parse(body);

    const paymentService = new PaymentService();
    const result = await paymentService.confirmStripePayment(
      validatedData.paymentIntentId
    );

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      paymentId: result.paymentId,
    });
  } catch (error) {
    console.error("Confirm Stripe payment error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to confirm payment" },
      { status: 500 }
    );
  }
}
