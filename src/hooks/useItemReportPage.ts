import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ItemReportData,
  ItemReportResponse,
  ItemReportFilters,
} from "@/types/admin-reports";

// API function to fetch item report data with server-side pagination and filtering
async function fetchItemReport(
  page: number = 1,
  limit: number = 10,
  category?: string,
  search?: string
): Promise<ItemReportResponse> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: ((page - 1) * limit).toString(),
  });

  if (category) params.append("category", category);
  if (search) params.append("search", search);

  const response = await fetch(`/api/admin/reports/items?${params.toString()}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch item report");
  }

  return response.json();
}

export function useItemReportPage() {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Use React Query to fetch item report data with server-side pagination
  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["itemReport", currentPage, categoryFilter, searchFilter],
    queryFn: () =>
      fetchItemReport(
        currentPage,
        itemsPerPage,
        categoryFilter || undefined,
        searchFilter || undefined
      ),
    staleTime: 30000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });

  const items = data?.items || [];
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
      case "UNPAID":
        return "bg-red-100 text-red-800";
      case "PAID":
        return "bg-emerald-100 text-emerald-800";
      case "REFUNDED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter handlers
  const handleCategoryFilterChange = useCallback((category: string) => {
    setCategoryFilter(category);
    setCurrentPage(1); // Reset to first page when filter changes
  }, []);

  const handleSearchFilterChange = useCallback((search: string) => {
    setSearchFilter(search);
    setCurrentPage(1); // Reset to first page when filter changes
  }, []);

  const clearFilters = useCallback(() => {
    setCategoryFilter("");
    setSearchFilter("");
    setCurrentPage(1);
  }, []);

  // Pagination handlers
  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const goToNextPage = useCallback(() => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [hasMore]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  // Calculate pagination info
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalCount);

  return {
    // Data
    items,
    totalCount,
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    hasMore,

    // Filters
    categoryFilter,
    searchFilter,

    // Loading and error states
    loading,
    error,
    refetch,

    // Filter handlers
    handleCategoryFilterChange,
    handleSearchFilterChange,
    clearFilters,

    // Pagination handlers
    goToPage,
    goToNextPage,
    goToPreviousPage,

    // Utility functions
    formatPrice,
    getStatusColor,
    getPaymentStatusColor,
  };
}
