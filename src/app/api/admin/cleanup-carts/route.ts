import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CartService } from "@/lib/services/cart-service";

/**
 * @swagger
 * /api/admin/cleanup-carts:
 *   post:
 *     summary: Clean up abandoned carts
 *     description: Removes cart orders older than 1 day to prevent database bloat
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Cleanup completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 anonymousCartsDeleted:
 *                   type: number
 *                 userCartsDeleted:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const cartService = new CartService();
    const result = await cartService.cleanupAbandonedCarts();

    return NextResponse.json({
      message: "Cart cleanup completed successfully",
      cartOrdersDeleted: result.cartOrdersDeleted,
    });
  } catch (error) {
    console.error("Cart cleanup error:", error);
    return NextResponse.json(
      { error: "Failed to cleanup carts" },
      { status: 500 }
    );
  }
}
