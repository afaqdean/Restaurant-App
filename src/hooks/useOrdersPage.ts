import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Order } from "@/types/customer-pages";

// API function to fetch all orders (no filtering on server)
async function fetchOrders(): Promise<{ orders: Order[] }> {
  const response = await fetch("/api/orders");

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch orders");
  }

  return response.json();
}

export function useOrdersPage() {
  const [statusFilter, setStatusFilter] = useState("");

  // Use React Query to fetch all orders once
  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 30000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });

  // Client-side filtering logic (like menu page)
  const orders = useMemo(() => {
    if (!data?.orders) return [];

    let filtered = data.orders.filter(
      (order: Order) => order.status !== "CART"
    );

    // Filter by status if not empty
    if (statusFilter) {
      filtered = filtered.filter(
        (order: Order) => order.status === statusFilter
      );
    }

    return filtered;
  }, [data?.orders, statusFilter]);

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "ACCEPTED":
        return "bg-blue-100 text-blue-800";
      case "IN_KITCHEN":
        return "bg-orange-100 text-orange-800";
      case "READY":
        return "bg-emerald-100 text-emerald-800";
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-emerald-100 text-emerald-800";
      case "UNPAID":
        return "bg-yellow-100 text-yellow-800";
      case "REFUNDED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusFilterChange = (newStatus: string) => {
    setStatusFilter(newStatus);
  };

  const clearFilters = () => {
    setStatusFilter("");
  };

  return {
    // Data
    orders,

    // State
    statusFilter,
    loading,
    error: error?.message || null,

    // Actions
    handleStatusFilterChange,
    clearFilters,
    refetch,

    // Utils
    formatPrice,
    getStatusColor,
    getPaymentStatusColor,
  };
}
