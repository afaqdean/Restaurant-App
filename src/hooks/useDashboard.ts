import { useQuery } from "@tanstack/react-query";

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

export interface RecentOrder {
  id: string;
  orderNumber: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  customer?: {
    id: string;
    name: string;
    email: string;
  };
  items: Array<{
    id: string;
    quantity: number;
    item: {
      name: string;
    };
  }>;
}

export interface DashboardData {
  kpis: DashboardKPIs;
  recentOrders: RecentOrder[];
}

export function useDashboard() {
  return useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await fetch("/api/admin/dashboard");
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      return response.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}
