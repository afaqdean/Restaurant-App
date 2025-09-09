import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DashboardService } from "@/lib/services/dashboard-service";

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard KPIs
 *     description: Returns key performance indicators for the admin dashboard
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Dashboard KPIs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 kpis:
 *                   type: object
 *                   properties:
 *                     todaysOrders:
 *                       type: number
 *                     todaysRevenue:
 *                       type: number
 *                     averageOrderValue:
 *                       type: number
 *                     openOrders:
 *                       type: number
 *                     stripeRevenue:
 *                       type: number
 *                     codRevenue:
 *                       type: number
 *                     stripeOrders:
 *                       type: number
 *                     codOrders:
 *                       type: number
 *                     totalOrders:
 *                       type: number
 *                     totalRevenue:
 *                       type: number
 *                 recentOrders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
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

    const dashboardService = new DashboardService();
    const [kpis, recentOrders] = await Promise.all([
      dashboardService.getDashboardKPIs(),
      dashboardService.getRecentOrders(10),
    ]);

    return NextResponse.json({
      kpis,
      recentOrders,
    });
  } catch (error) {
    console.error("Get dashboard KPIs error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve dashboard data" },
      { status: 500 }
    );
  }
}
