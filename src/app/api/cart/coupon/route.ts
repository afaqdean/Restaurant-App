import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { applyCouponSchema } from "@/lib/validations/cart";
import { CartService } from "@/lib/services/cart-service";
import { cookies } from "next/headers";

/**
 * Get or create session ID for anonymous users
 */
function getSessionId(): string {
  const cookieStore = cookies();
  let sessionId = cookieStore.get("cart_session")?.value;

  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  return sessionId;
}

/**
 * @swagger
 * /api/cart/coupon:
 *   post:
 *     summary: Apply coupon to cart
 *     description: Validates and applies a coupon code to the current cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Coupon code to apply
 *     responses:
 *       200:
 *         description: Coupon applied successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   $ref: '#/components/schemas/CartSummary'
 *       400:
 *         description: Invalid coupon code or cart
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const cartService = new CartService();

    const body = await request.json();
    const validatedData = applyCouponSchema.parse(body);

    let cart;
    if (session?.user?.id) {
      // Authenticated user
      cart = await cartService.applyCoupon(
        session.user.id,
        undefined,
        validatedData.code
      );
    } else {
      // Anonymous user
      const sessionId = getSessionId();
      cart = await cartService.applyCoupon(
        undefined,
        sessionId,
        validatedData.code
      );
    }

    const cartSummary = await cartService.calculateCartSummary(cart);

    // Set session cookie for anonymous users
    const response = NextResponse.json({
      message: "Coupon applied successfully",
      cart: cartSummary,
    });

    if (!session?.user?.id) {
      const sessionId = getSessionId();
      response.cookies.set("cart_session", sessionId, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    return response;
  } catch (error) {
    console.error("Apply coupon error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid coupon code format" },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to apply coupon" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/cart/coupon:
 *   delete:
 *     summary: Remove coupon from cart
 *     description: Removes the applied coupon from the current cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Coupon removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   $ref: '#/components/schemas/CartSummary'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const cartService = new CartService();

    let cart;
    if (session?.user?.id) {
      // Authenticated user
      cart = await cartService.removeCoupon(session.user.id, undefined);
    } else {
      // Anonymous user
      const sessionId = getSessionId();
      cart = await cartService.removeCoupon(undefined, sessionId);
    }

    const cartSummary = await cartService.calculateCartSummary(cart);

    // Set session cookie for anonymous users
    const response = NextResponse.json({
      message: "Coupon removed successfully",
      cart: cartSummary,
    });

    if (!session?.user?.id) {
      const sessionId = getSessionId();
      response.cookies.set("cart_session", sessionId, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    return response;
  } catch (error) {
    console.error("Remove coupon error:", error);
    return NextResponse.json(
      { error: "Failed to remove coupon" },
      { status: 500 }
    );
  }
}
