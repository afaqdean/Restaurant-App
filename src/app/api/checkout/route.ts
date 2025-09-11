import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkoutSchema } from "@/lib/validations/cart";
import { OrderService } from "@/lib/services/order-service";
import { PaymentService } from "@/lib/services/payment-service";
import { CartService } from "@/lib/services/cart-service";
import { cookies } from "next/headers";

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Process checkout
 *     description: Creates an order from cart and initiates payment
 *     tags: [Checkout]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customerName:
 *                   type: string
 *                 customerEmail:
 *                   type: string
 *                 customerPhone:
 *                   type: string
 *                 paymentMethod:
 *                   type: string
 *                   enum: [CARD, COD]
 *                 notes:
 *                   type: string
 *                 couponCode:
 *                   type: string
 *     responses:
 *       200:
 *         description: Checkout processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 orderId:
 *                   type: string
 *                 orderNumber:
 *                   type: string
 *                 paymentResult:
 *                   type: object
 *       400:
 *         description: Invalid request data or cart empty
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
async function getSessionId(): Promise<string> {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get("cart_session")?.value;
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  return sessionId;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const validatedData = checkoutSchema.parse(body);

    const cartService = new CartService();
    const orderService = new OrderService();
    const paymentService = new PaymentService();

    // Get cart from database
    let cartOrder;
    if (session?.user?.id) {
      cartOrder = await cartService.getCart(session.user.id);
    } else {
      const sessionId = await getSessionId();
      cartOrder = await cartService.getCart(undefined, sessionId);
    }

    if (!cartOrder || !cartOrder.items || cartOrder.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Convert cart order to final order
    const cartSummary = await cartService.calculateCartSummary(cartOrder);

    // Create order from cart
    const orderResult = await orderService.createOrderFromCart(
      cartOrder,
      cartSummary,
      validatedData,
      session?.user?.id
    );

    if (!orderResult.success) {
      return NextResponse.json({ error: orderResult.error }, { status: 400 });
    }

    let paymentResult = null;

    // Process payment based on method
    if (validatedData.paymentMethod === "CARD") {
      // For Stripe, we'll create the payment intent
      // The frontend will handle the actual payment flow
      const order = await orderService.getOrderById(orderResult.orderId!);
      if (order) {
        const stripeResult = await paymentService.createStripePaymentIntent(
          order.id,
          order.total,
          order.customerEmail,
          order.customerName
        );
        paymentResult = stripeResult;
      }
    } else if (validatedData.paymentMethod === "COD") {
      // Create COD payment record
      const codResult = await paymentService.createCodPayment(
        orderResult.orderId!
      );
      paymentResult = codResult;
    }

    // Clear the cart after successful order creation
    // For COD orders, clear immediately. For card payments, let the payment page handle it
    if (validatedData.paymentMethod === "COD") {
      if (session?.user?.id) {
        await cartService.clearCart(session.user.id, undefined);
      } else {
        const sessionId = await getSessionId();
        await cartService.clearCart(undefined, sessionId);
      }
    }

    const response = NextResponse.json({
      success: true,
      orderId: orderResult.orderId,
      orderNumber: orderResult.orderNumber,
      paymentResult,
    });

    // Set session cookie for anonymous users
    if (!session?.user?.id) {
      const sessionId = await getSessionId();
      response.cookies.set("cart_session", sessionId, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    return response;
  } catch (error) {
    console.error("Checkout error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process checkout" },
      { status: 500 }
    );
  }
}
