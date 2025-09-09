"use client";

import Link from "next/link";
import Image from "next/image";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { PageWrapper, PageStateHandler, PageHeader } from "@/components/ui/layout";
import { StatusBadge } from "@/components/ui";
import { useOrdersPage } from "@/hooks/useOrdersPage";

export default function OrdersPage() {
  const {
    orders,
    statusFilter,
    loading,
    error,
    handleStatusFilterChange,
    clearFilters,
    refetch,
    formatPrice,
  } = useOrdersPage();

  return (
    <PageWrapper>
      <PageStateHandler
        loading={loading}
        error={error}
        loadingMessage="Loading orders..."
        onRetry={refetch}
      >
        <PageHeader
          title={
            <>
              Your <span className="text-emerald-600">Order History</span>
            </>
          }
          subtitle="Track your orders and view past purchases"
        />
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/menu">
              <PrimaryButton
                size="md"
                variant="gradient"
                className="shadow-lg hover:shadow-xl"
              >
                Order Again
              </PrimaryButton>
            </Link>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">
                Filter by Status
              </label>
              {statusFilter && (
                <SecondaryButton
                  onClick={clearFilters}
                  size="sm"
                  variant="outline"
                  className="text-emerald-600 border-emerald-300 hover:bg-emerald-50"
                >
                  Clear Filter
                </SecondaryButton>
              )}
            </div>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            >
              <option value="">All Orders</option>
              <option value="PENDING">Pending</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="IN_KITCHEN">In Kitchen</option>
              <option value="READY">Ready</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Orders Found</h2>
            <p className="text-gray-600 mb-8">
              {statusFilter ? `No orders with status "${statusFilter}"` : "You haven't placed any orders yet."}
            </p>
            <Link href="/menu">
              <PrimaryButton
                size="md"
                variant="gradient"
                className="shadow-lg hover:shadow-xl"
              >
                Browse Menu
              </PrimaryButton>
            </Link>
          </div>
        ) : (
          <div className="space-y-6 pb-12">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Order #{order.orderNumber}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{formatPrice(order.total)}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <StatusBadge 
                        status={order.status} 
                        className="px-2 py-1 rounded-full text-xs"
                      />
                      <StatusBadge 
                        status={order.paymentStatus} 
                        className="px-2 py-1 rounded-full text-xs"
                        showIcon={false}
                      />
                    </div>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="mb-4">
                  <div className="flex items-center space-x-4">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <div className="relative w-12 h-12">
                          <Image
                            src={item.item.image || "/images/placeholder.jpg"}
                            alt={item.item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-sm text-gray-500">+{order.items.length - 3} more items</p>
                    )}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Payment: {order.paymentMethod === "CARD" ? "Credit/Debit Card" : "Cash on Delivery"}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <Link href={`/order/${order.id}`}>
                    <PrimaryButton
                      size="sm"
                      variant="gradient"
                      className="shadow-lg hover:shadow-xl"
                    >
                      View Details
                    </PrimaryButton>
                  </Link>
                  
                  {order.status === "COMPLETED" && (
                    <Link href="/menu">
                      <SecondaryButton
                        size="sm"
                        variant="outline"
                        className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      >
                        Order Again
                      </SecondaryButton>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </PageStateHandler>
    </PageWrapper>
  );
}
