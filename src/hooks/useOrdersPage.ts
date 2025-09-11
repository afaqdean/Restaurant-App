import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Order } from "@/types/customer-pages";

// API function to fetch orders with server-side pagination and filtering
async function fetchOrders(
  page: number = 1,
  limit: number = 10,
  status?: string,
  paymentMethod?: string,
  paymentStatus?: string
): Promise<{ orders: Order[]; totalCount: number; hasMore: boolean }> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: ((page - 1) * limit).toString(),
  });

  if (status) params.append("status", status);
  if (paymentMethod) params.append("paymentMethod", paymentMethod);
  if (paymentStatus) params.append("paymentStatus", paymentStatus);

  const response = await fetch(`/api/orders?${params.toString()}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch orders");
  }

  return response.json();
}

export function useOrdersPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Use React Query to fetch orders with server-side pagination
  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "orders",
      currentPage,
      statusFilter,
      paymentMethodFilter,
      paymentStatusFilter,
    ],
    queryFn: () =>
      fetchOrders(
        currentPage,
        itemsPerPage,
        statusFilter || undefined,
        paymentMethodFilter || undefined,
        paymentStatusFilter || undefined
      ),
    staleTime: 30000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });

  const orders = data?.orders || [];
  const totalCount = data?.totalCount || 0;
  const hasMore = data?.hasMore || false;

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

  const handleStatusFilterChange = useCallback((newStatus: string) => {
    setStatusFilter(newStatus);
    setCurrentPage(1); // Reset to first page when filter changes
  }, []);

  const handlePaymentMethodFilterChange = useCallback((newMethod: string) => {
    setPaymentMethodFilter(newMethod);
    setCurrentPage(1); // Reset to first page when filter changes
  }, []);

  const handlePaymentStatusFilterChange = useCallback((newStatus: string) => {
    setPaymentStatusFilter(newStatus);
    setCurrentPage(1); // Reset to first page when filter changes
  }, []);

  const clearFilters = useCallback(() => {
    setStatusFilter("");
    setPaymentMethodFilter("");
    setPaymentStatusFilter("");
    setCurrentPage(1); // Reset to first page when clearing filters
  }, []);

  // Pagination functions
  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(totalCount / itemsPerPage))
    );
  }, [totalCount, itemsPerPage]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  // Calculate pagination info
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalCount);

  return {
    // Data
    orders,
    totalCount,
    totalPages,
    currentPage,
    itemsPerPage,
    startIndex,
    endIndex,
    hasMore,

    // State
    statusFilter,
    paymentMethodFilter,
    paymentStatusFilter,
    loading,
    error: error?.message || null,

    // Actions
    handleStatusFilterChange,
    handlePaymentMethodFilterChange,
    handlePaymentStatusFilterChange,
    clearFilters,
    refetch,

    // Pagination
    goToPage,
    goToNextPage,
    goToPreviousPage,

    // Utils
    formatPrice,
    getStatusColor,
    getPaymentStatusColor,
  };
}
