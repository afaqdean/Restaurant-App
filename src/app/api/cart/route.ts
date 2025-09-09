import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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
 * /api/cart:
 *   get:
 *     summary: Get current cart
 *     description: Returns the current cart contents with calculated totals
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   $ref: '#/components/schemas/CartSummary'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const cartService = new CartService();

    let cart;
    if (session?.user?.id) {
      // Authenticated user
      cart = await cartService.getCart(session.user.id, undefined);
    } else {
      // Anonymous user
      const sessionId = getSessionId();
      cart = await cartService.getCart(undefined, sessionId);
    }

    const cartSummary = await cartService.calculateCartSummary(cart);

    // Set session cookie for anonymous users
    const response = NextResponse.json({ cart: cartSummary });
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
    console.error("Get cart error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve cart" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add item to cart
 *     description: Adds an item to the cart with specified quantity and options
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *               notes:
 *                 type: string
 *                 maxLength: 500
 *               selectedOptions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     optionId:
 *                       type: string
 *                     groupId:
 *                       type: string
 *     responses:
 *       200:
 *         description: Item added to cart successfully
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
 *         description: Invalid request data
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
    const { itemId, quantity, notes, selectedOptions } = body;

    // Validate required fields
    if (!itemId || !quantity) {
      return NextResponse.json(
        { error: "Item ID and quantity are required" },
        { status: 400 }
      );
    }

    let cart;
    if (session?.user?.id) {
      // Authenticated user
      cart = await cartService.addToCart(
        session.user.id,
        undefined,
        itemId,
        quantity,
        notes,
        selectedOptions
      );
    } else {
      // Anonymous user
      const sessionId = getSessionId();
      cart = await cartService.addToCart(
        undefined,
        sessionId,
        itemId,
        quantity,
        notes,
        selectedOptions
      );
    }

    const cartSummary = await cartService.calculateCartSummary(cart);

    // Set session cookie for anonymous users
    const response = NextResponse.json({
      message: "Item added to cart successfully",
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
    console.error("Add to cart error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/cart:
 *   put:
 *     summary: Update cart item
 *     description: Updates quantity, notes, or options for a cart item
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 10
 *               notes:
 *                 type: string
 *                 maxLength: 500
 *               selectedOptions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     optionId:
 *                       type: string
 *                     groupId:
 *                       type: string
 *     responses:
 *       200:
 *         description: Cart item updated successfully
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
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Internal server error
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const cartService = new CartService();

    const body = await request.json();
    const { itemId, quantity, notes, selectedOptions } = body;

    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    let cart;
    if (session?.user?.id) {
      // Authenticated user
      cart = await cartService.updateCartItem(
        session.user.id,
        undefined,
        itemId,
        quantity,
        notes,
        selectedOptions
      );
    } else {
      // Anonymous user
      const sessionId = getSessionId();
      cart = await cartService.updateCartItem(
        undefined,
        sessionId,
        itemId,
        quantity,
        notes,
        selectedOptions
      );
    }

    const cartSummary = await cartService.calculateCartSummary(cart);

    // Set session cookie for anonymous users
    const response = NextResponse.json({
      message: "Cart item updated successfully",
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
    console.error("Update cart error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     summary: Clear cart
 *     description: Removes all items from the cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const cartService = new CartService();

    if (session?.user?.id) {
      // Authenticated user
      await cartService.clearCart(session.user.id, undefined);
    } else {
      // Anonymous user
      const sessionId = getSessionId();
      await cartService.clearCart(undefined, sessionId);
    }

    return NextResponse.json({
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Clear cart error:", error);
    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
