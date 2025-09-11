"use client";

import { useState, useEffect } from "react";
import { PageErrorState } from "@/components/ui/StandardStates";
import { ItemReportTable } from "@/components/admin/ItemReportTable";
import { ItemFilterPopupButton } from "@/components/admin/ItemFilterPopupButton";
import { SkeletonAdminPage } from "@/components/ui/skeleton";
import { useItemReportPage } from "@/hooks/useItemReportPage";
import { useCategories } from "@/hooks/useMenuManagement";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminItemReportPage() {
  // Use the custom hook for item report management with server-side pagination
  const {
    items,
    totalCount,
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    categoryFilter,
    searchFilter,
    loading,
    error,
    handleCategoryFilterChange,
    handleSearchFilterChange,
    clearFilters,
    refetch,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    formatPrice,
  } = useItemReportPage();

  // Get categories for filter dropdown
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.categories || [];

  if (loading) {
    return (
      <SkeletonAdminPage
        titleWidth={80}
        subtitleWidth={96}
        showFilterButton={true}
        filterButtonWidth={100}
        tableColumns={6}
        tableRows={8}
        showPagination={true}
      />
    );
  }

  if (error) {
    return (
      <PageErrorState 
        title="Error Loading Item Tracker"
        message="Failed to load item tracker data. Please try again." 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8" data-aos="fade-up">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Item Tracker</h1>
            <p className="text-lg text-gray-600">Track item orders, deliveries, and revenue for today</p>
          </div>
        </div>

        {/* Filter Button */}
        <div className="flex justify-end mb-6" data-aos="fade-up" data-aos-delay="100">
          <div className="relative">
            <ItemFilterPopupButton
              categoryFilter={categoryFilter}
              searchFilter={searchFilter}
              onCategoryFilterChange={handleCategoryFilterChange}
              onSearchFilterChange={handleSearchFilterChange}
              onClearFilters={clearFilters}
              categories={categories}
              variant="primary"
              size="md"
            />
          </div>
        </div>

        {/* Items Table */}
        <ItemReportTable
          items={items}
          formatPrice={formatPrice}
          className="mb-8"
          data-aos="fade-up"
          data-aos-delay="200"
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between bg-white px-4 py-3 border border-gray-200 rounded-lg shadow-sm">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex}</span> to{" "}
                  <span className="font-medium">{endIndex}</span> of{" "}
                  <span className="font-medium">{totalCount}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  
                  {/* Page Numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNum
                            ? "z-10 bg-emerald-50 border-emerald-500 text-emerald-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
