import { prisma } from "@/lib/prisma";

export interface DashboardKPIs {
  todaysOrders: number;
  todaysRevenue: number;
  averageOrderValue: number;
  openOrders: number;
  stripeRevenue: number;
  codRevenue: number;
  stripeOrders: number;
  codOrders: number;
  totalOrders: number;
  totalRevenue: number;
}

export class DashboardService {
  async getDashboardKPIs(): Promise<DashboardKPIs> {
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

    // Get today's orders
    const todaysOrdersData = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
        status: {
          not: "CANCELLED",
        },
      },
      include: {
        payments: {
          where: {
            status: "PAID",
          },
        },
      },
    });

    // Get all completed orders for average calculation
    const completedOrdersData = await prisma.order.findMany({
      where: {
        status: "COMPLETED",
        paymentStatus: "PAID",
      },
      include: {
        payments: {
          where: {
            status: "PAID",
          },
        },
      },
    });

    // Get open orders (not completed or cancelled)
    const openOrders = await prisma.order.count({
      where: {
        status: {
          notIn: ["COMPLETED", "CANCELLED"],
        },
      },
    });

    // Calculate today's metrics
    const todaysOrders = todaysOrdersData.length;
    const todaysRevenue = todaysOrdersData.reduce((sum, order) => {
      return sum + (order.payments.length > 0 ? order.total : 0);
    }, 0);

    // Calculate payment method splits for today
    const todaysStripeOrders = todaysOrdersData.filter(
      (order) => order.paymentMethod === "CARD"
    ).length;
    const todaysCodOrders = todaysOrdersData.filter(
      (order) => order.paymentMethod === "COD"
    ).length;

    const todaysStripeRevenue = todaysOrdersData
      .filter((order) => order.paymentMethod === "CARD")
      .reduce((sum, order) => {
        return sum + (order.payments.length > 0 ? order.total : 0);
      }, 0);

    const todaysCodRevenue = todaysOrdersData
      .filter((order) => order.paymentMethod === "COD")
      .reduce((sum, order) => {
        return sum + (order.payments.length > 0 ? order.total : 0);
      }, 0);

    // Calculate overall metrics
    const totalOrders = completedOrdersData.length;
    const totalRevenue = completedOrdersData.reduce((sum, order) => {
      return sum + (order.payments.length > 0 ? order.total : 0);
    }, 0);

    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Calculate overall payment method splits
    const stripeOrders = completedOrdersData.filter(
      (order) => order.paymentMethod === "CARD"
    ).length;
    const codOrders = completedOrdersData.filter(
      (order) => order.paymentMethod === "COD"
    ).length;

    const stripeRevenue = completedOrdersData
      .filter((order) => order.paymentMethod === "CARD")
      .reduce((sum, order) => {
        return sum + (order.payments.length > 0 ? order.total : 0);
      }, 0);

    const codRevenue = completedOrdersData
      .filter((order) => order.paymentMethod === "COD")
      .reduce((sum, order) => {
        return sum + (order.payments.length > 0 ? order.total : 0);
      }, 0);

    return {
      todaysOrders,
      todaysRevenue,
      averageOrderValue,
      openOrders,
      stripeRevenue,
      codRevenue,
      stripeOrders,
      codOrders,
      totalOrders,
      totalRevenue,
    };
  }

  async getRecentOrders(limit: number = 10) {
    return await prisma.order.findMany({
      where: {
        status: {
          not: "CANCELLED",
        },
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            item: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }
}
