"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageErrorState } from "@/components/ui/StandardStates";
import { FilterPopupButton } from "@/components/ui/buttons";
import { SkeletonAdminPage } from "@/components/ui/skeleton";
import { OrderStatusDropdown } from "@/components/ui/OrderStatusDropdown";
import { useOrdersPage } from "@/hooks/useOrdersPage";

export default function AdminOrdersPage() {
  const router = useRouter();
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [showActionsMenu, setShowActionsMenu] = useState<string | null>(null);

  // Use the custom hook for orders management with server-side pagination
  const {
    orders,
    totalCount,
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    statusFilter,
    paymentMethodFilter,
    paymentStatusFilter,
    loading,
    error,
    handleStatusFilterChange,
    handlePaymentMethodFilterChange,
    handlePaymentStatusFilterChange,
    clearFilters,
    refetch,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    formatPrice,
    getPaymentStatusColor,
  } = useOrdersPage();


  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh orders
        refetch();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update order status");
      }
    } catch {
      alert("Network error");
    } finally {
      setUpdatingStatus(null);
    }
  };


  const markAsPaid = async (orderId: string) => {
    try {
      // Use the COD confirmation API instead
      const response = await fetch(`/api/payments/cod/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      
      if (response.ok) {
        refetch();
        setShowActionsMenu(null);
        alert("Order marked as paid successfully");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to mark as paid");
      }
    } catch {
      alert("Network error");
    }
  };

  // Close actions menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (showActionsMenu) {
        // Check if click is outside any dropdown or button
        const target = event.target as Element;
        const isDropdownClick = target.closest('[data-dropdown-menu]');
        const isButtonClick = target.closest('[data-actions-button]');
        
        if (!isDropdownClick && !isButtonClick) {
          setShowActionsMenu(null);
        }
      }
    }

    if (showActionsMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showActionsMenu]);



  if (loading) {
    return (
      <SkeletonAdminPage
        titleWidth={64}
        subtitleWidth={80}
        showFilterButton={true}
        filterButtonWidth={100}
        tableColumns={7}
        tableRows={8}
        showPagination={true}
      />
    );
  }

  if (error) {
    return (
      <PageErrorState 
        message={error} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8" data-aos="fade-up">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Management</h1>
            <p className="text-lg text-gray-600">Manage and track all restaurant orders</p>
          </div>
        </div>

        {/* Filter Button */}
        <div className="flex justify-end mb-6" data-aos="fade-up" data-aos-delay="100">
          <div className="relative">
          <FilterPopupButton
            statusFilter={statusFilter}
            paymentMethodFilter={paymentMethodFilter}
            paymentStatusFilter={paymentStatusFilter}
            onStatusFilterChange={handleStatusFilterChange}
            onPaymentMethodFilterChange={handlePaymentMethodFilterChange}
            onPaymentStatusFilterChange={handlePaymentStatusFilterChange}
            onClearFilters={clearFilters}
            variant="primary"
            size="md"
          >
            Filter
          </FilterPopupButton>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative" data-aos="fade-up" data-aos-delay="200">
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-8 h-8 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
                <p className="text-sm text-gray-600 font-medium">Loading orders...</p>
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-48">
                    Order
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-48">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-64">
                    Order Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                    Payment Method
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                    Payment Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">
                    Total
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-20">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                    {/* Order Column */}
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">#{order.orderNumber.split('-').pop()}</span>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-gray-900 truncate">
                            #{order.orderNumber}
                          </div>
                          <div className="text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                        </div>
                          <div className="text-xs text-gray-400">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Customer Column */}
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-medium text-sm">
                              {(order.customer?.name || "N/A").charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {order.customer?.name || "N/A"}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {order.customer?.email || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Order Status Column */}
                    <td className="px-6 py-5">
                        <OrderStatusDropdown
                          value={order.status}
                          onChange={(value) => updateOrderStatus(order.id, value)}
                          disabled={updatingStatus === order.id}
                          style={{ minWidth: '140px' }}
                        />
                    </td>

                    {/* Payment Method Column */}
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${order.paymentMethod === "CARD" ? "bg-blue-600" : "bg-emerald-600"}`}></div>
                        <span className="text-sm font-medium text-gray-900">
                          {order.paymentMethod === "CARD" ? "Card" : "COD"}
                        </span>
                      </div>
                    </td>

                    {/* Payment Status Column */}
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>

                    {/* Total Column */}
                    <td className="px-6 py-5">
                      <div className="text-sm font-semibold text-gray-900">
                        {formatPrice(order.total)}
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-5 text-center">
                      <div className="relative">
                        <button
                          onClick={() => setShowActionsMenu(showActionsMenu === order.id ? null : order.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          data-actions-button
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                        
                        {/* Actions Dropdown */}
                        {showActionsMenu === order.id && (
                          <div 
                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50" 
                            onClick={(e) => e.stopPropagation()}
                            data-dropdown-menu
                          >
                            <div className="py-1" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/admin/orders/${order.id}`);
                                  setShowActionsMenu(null);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>View Order Details</span>
                              </button>
                              
                              <button
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  try {
                                    const response = await fetch(`/api/orders/${order.id}/receipt`);
                                    if (response.ok) {
                                      const blob = await response.blob();
                                      const url = window.URL.createObjectURL(blob);
                                      const a = document.createElement('a');
                                      a.href = url;
                                      a.download = `receipt-${order.orderNumber}.pdf`;
                                      document.body.appendChild(a);
                                      a.click();
                                      window.URL.revokeObjectURL(url);
                                      document.body.removeChild(a);
                                    } else {
                                      const error = await response.json();
                                      alert(`Failed to download receipt: ${error.error}`);
                                    }
                                    setShowActionsMenu(null);
                                  } catch {
                                    alert('Failed to download receipt');
                                  }
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>Download Receipt</span>
                              </button>
                              
                              {order.paymentStatus === "UNPAID" && (
                          <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsPaid(order.id);
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                          >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>Mark as Paid</span>
                          </button>
                        )}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {totalCount === 0 && (
          <div className="text-center py-16" data-aos="fade-up">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Orders Found</h2>
            <p className="text-gray-600">No orders match the current filters.</p>
          </div>
        )}

        {/* Pagination */}
        {totalCount > 0 && totalPages > 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mt-4" data-aos="fade-up" data-aos-delay="300">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-600">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{endIndex}</span> of{' '}
                <span className="font-medium">{totalCount}</span> results
              </div>
              
              <div className="flex items-center space-x-1">
                {/* Previous Button */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-2 py-1.5 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ←
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current page
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                            currentPage === page
                              ? 'bg-emerald-500 text-white'
                              : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return <span key={page} className="px-1 text-gray-400">...</span>;
                    }
                    return null;
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1.5 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
