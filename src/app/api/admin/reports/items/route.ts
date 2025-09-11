import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-utils";

export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;

    // Get today's date range (start and end of today)
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    // Build where clause for orders created today
    const orderWhere = {
      createdAt: {
        gte: startOfDay,
        lt: endOfDay,
      },
      status: {
        not: "CART" as const, // Exclude cart orders
      },
    };

    // Get all items with their order counts for today
    const items = await prisma.item.findMany({
      where: {
        active: true,
        ...(category && { categoryId: category }),
        ...(search && {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }),
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        orderItems: {
          where: {
            order: orderWhere,
          },
          include: {
            order: {
              select: {
                status: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
      skip: offset,
      take: limit,
    });

    // Transform the data to include aggregated counts
    const itemReportData = items.map((item) => {
      const totalOrders = item.orderItems.reduce(
        (sum, orderItem) => sum + orderItem.quantity,
        0
      );

      const deliveredOrders = item.orderItems.reduce((sum, orderItem) => {
        return orderItem.order.status === "COMPLETED"
          ? sum + orderItem.quantity
          : sum;
      }, 0);

      const remainingOrders = totalOrders - deliveredOrders;

      const revenue = item.orderItems.reduce((sum, orderItem) => {
        return orderItem.order.status === "COMPLETED"
          ? sum + orderItem.price * orderItem.quantity
          : sum;
      }, 0);

      return {
        itemId: item.id,
        itemName: item.name,
        categoryName: item.category.name,
        totalOrders,
        deliveredOrders,
        remainingOrders,
        revenue,
      };
    });

    // Get total count for pagination
    const totalCount = await prisma.item.count({
      where: {
        active: true,
        ...(category && { categoryId: category }),
        ...(search && {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }),
      },
    });

    const hasMore = offset + limit < totalCount;

    return NextResponse.json({
      items: itemReportData,
      totalCount,
      hasMore,
    });
  } catch (error) {
    console.error("Error fetching item report:", error);
    return NextResponse.json(
      { error: "Failed to fetch item report" },
      { status: 500 }
    );
  }
}
