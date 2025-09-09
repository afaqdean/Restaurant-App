"use client";

import { requireAdmin } from "@/lib/auth-utils";
import { useDashboard } from "@/hooks/useDashboard";
import { KPICard } from "@/components/admin/KPICard";
import { PaymentSplitCard } from "@/components/admin/PaymentSplitCard";
import { RecentOrdersCard } from "@/components/admin/RecentOrdersCard";
import { 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Clock,
  Package,
  Users
} from "lucide-react";

export default function AdminDashboardPage() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Dashboard</h1>
          <p className="text-gray-600">Failed to load dashboard data. Please try again.</p>
        </div>
      </div>
    );
  }

  const kpis = data?.kpis;
  const recentOrders = data?.recentOrders || [];

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your restaurant overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Today's Orders"
          value={kpis?.todaysOrders || 0}
          subtitle="Orders placed today"
          icon={ShoppingCart}
        />
        <KPICard
          title="Today's Revenue"
          value={formatPrice(kpis?.todaysRevenue || 0)}
          subtitle="Revenue from today's orders"
          icon={DollarSign}
        />
        <KPICard
          title="Average Order Value"
          value={formatPrice(kpis?.averageOrderValue || 0)}
          subtitle="Average per completed order"
          icon={TrendingUp}
        />
        <KPICard
          title="Open Orders"
          value={kpis?.openOrders || 0}
          subtitle="Orders in progress"
          icon={Clock}
        />
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <PaymentSplitCard
          stripeOrders={kpis?.stripeOrders || 0}
          codOrders={kpis?.codOrders || 0}
          stripeRevenue={kpis?.stripeRevenue || 0}
          codRevenue={kpis?.codRevenue || 0}
        />
        <RecentOrdersCard orders={recentOrders} />
      </div>

    </div>
  );
}
