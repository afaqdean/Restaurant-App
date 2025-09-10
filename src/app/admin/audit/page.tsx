"use client";

import { useState } from "react";
import { Clock, User, Package, Filter } from "lucide-react";
import { useAuditLogs, AuditLog } from "@/hooks/useAuditLogs";

export default function AdminAuditPage() {
  const [filters, setFilters] = useState<{ orderId?: string }>({});
  const [limit, setLimit] = useState(50);

  const { data, isLoading, error } = useAuditLogs({ ...filters, limit });

  const logs = data?.logs || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getActionColor = (action: string) => {
    const colors = {
      ORDER_STATUS_CHANGED: "bg-blue-100 text-blue-800",
      PAYMENT_STATUS_CHANGED: "bg-green-100 text-green-800",
      COD_PAYMENT_CONFIRMED: "bg-green-100 text-green-800",
      ITEM_CREATED: "bg-purple-100 text-purple-800",
      ITEM_UPDATED: "bg-yellow-100 text-yellow-800",
      ITEM_DELETED: "bg-red-100 text-red-800",
      CATEGORY_CREATED: "bg-purple-100 text-purple-800",
      CATEGORY_UPDATED: "bg-yellow-100 text-yellow-800",
      CATEGORY_DELETED: "bg-red-100 text-red-800",
      EXPENSE_CREATED: "bg-orange-100 text-orange-800",
      EXPENSE_UPDATED: "bg-yellow-100 text-yellow-800",
      EXPENSE_DELETED: "bg-red-100 text-red-800",
      SETTINGS_UPDATED: "bg-gray-100 text-gray-800",
    };
    return colors[action as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getActionLabel = (action: string) => {
    const labels = {
      ORDER_STATUS_CHANGED: "Order Status Changed",
      PAYMENT_STATUS_CHANGED: "Payment Status Changed",
      COD_PAYMENT_CONFIRMED: "COD Payment Confirmed",
      ITEM_CREATED: "Item Created",
      ITEM_UPDATED: "Item Updated",
      ITEM_DELETED: "Item Deleted",
      CATEGORY_CREATED: "Category Created",
      CATEGORY_UPDATED: "Category Updated",
      CATEGORY_DELETED: "Category Deleted",
      EXPENSE_CREATED: "Expense Created",
      EXPENSE_UPDATED: "Expense Updated",
      EXPENSE_DELETED: "Expense Deleted",
      SETTINGS_UPDATED: "Settings Updated",
    };
    return labels[action as keyof typeof labels] || action;
  };

  const parseValue = (value?: string) => {
    if (!value) return null;
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(value);
      // If it's a string that was JSON-encoded, return the string
      if (typeof parsed === 'string') {
        return parsed;
      }
      // If it's an object, return it
      return parsed;
    } catch {
      // If JSON parsing fails, return the original string
      return value;
    }
  };

  const clearFilters = () => {
    setFilters({});
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Audit Logs</h1>
          <p className="text-gray-600">Failed to load audit logs. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Audit Logs</h1>
        <p className="text-lg text-gray-600">Track all system activities and changes.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6" data-aos="fade-up" data-aos-delay="100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700">Order ID:</label>
              <input
                type="text"
                value={filters.orderId || ""}
                onChange={(e) => setFilters({ ...filters, orderId: e.target.value || undefined })}
                className="px-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="Filter by order ID"
              />
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700">Limit:</label>
              <select
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className="px-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
              </select>
            </div>

            {(filters.orderId) && (
              <button
                onClick={clearFilters}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="text-sm text-gray-500">
            Showing {logs.length} of {logs.length} logs
          </div>
        </div>
      </div>

      {/* Audit Logs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100" data-aos="fade-up" data-aos-delay="200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Activity Log</h2>
        </div>

        {logs.length === 0 ? (
          <div className="p-6 text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No audit logs found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {logs.map((log) => {
              const oldValue = parseValue(log.oldValue);
              const newValue = parseValue(log.newValue);

              return (
                <div key={log.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                          {getActionLabel(log.action)}
                        </span>
                        
                        {log.orderNumber && (
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Package className="w-4 h-4" />
                            <span>Order #{log.orderNumber}</span>
                          </div>
                        )}
                      </div>

                      <div className="text-sm text-gray-900 mb-2">
                        {log.action === "ORDER_STATUS_CHANGED" && (
                          <span>
                            Order status changed from <strong>{typeof oldValue === 'object' ? oldValue?.status : oldValue}</strong> to <strong>{typeof newValue === 'object' ? newValue?.status : newValue}</strong>
                          </span>
                        )}
                        {log.action === "PAYMENT_STATUS_CHANGED" && (
                          <span>
                            Payment status changed from <strong>{typeof oldValue === 'object' ? oldValue?.paymentStatus : oldValue}</strong> to <strong>{typeof newValue === 'object' ? newValue?.paymentStatus : newValue}</strong>
                          </span>
                        )}
                        {log.action === "COD_PAYMENT_CONFIRMED" && (
                          <span>
                            Cash on Delivery payment confirmed
                          </span>
                        )}
                        {log.action === "ITEM_CREATED" && (
                          <span>
                            New item created: <strong>{newValue?.name}</strong>
                          </span>
                        )}
                        {log.action === "ITEM_UPDATED" && (
                          <span>
                            Item updated: <strong>{newValue?.name || oldValue?.name}</strong>
                          </span>
                        )}
                        {log.action === "ITEM_DELETED" && (
                          <span>
                            Item deleted: <strong>{oldValue?.name}</strong>
                          </span>
                        )}
                        {log.action === "CATEGORY_CREATED" && (
                          <span>
                            New category created: <strong>{newValue?.name}</strong>
                          </span>
                        )}
                        {log.action === "CATEGORY_UPDATED" && (
                          <span>
                            Category updated: <strong>{newValue?.name || oldValue?.name}</strong>
                          </span>
                        )}
                        {log.action === "CATEGORY_DELETED" && (
                          <span>
                            Category deleted: <strong>{oldValue?.name}</strong>
                          </span>
                        )}
                        {log.action === "EXPENSE_CREATED" && (
                          <span>
                            New expense created: <strong>{newValue?.description}</strong>
                          </span>
                        )}
                        {log.action === "EXPENSE_UPDATED" && (
                          <span>
                            Expense updated: <strong>{newValue?.description || oldValue?.description}</strong>
                          </span>
                        )}
                        {log.action === "EXPENSE_DELETED" && (
                          <span>
                            Expense deleted: <strong>{oldValue?.description}</strong>
                          </span>
                        )}
                        {log.action === "SETTINGS_UPDATED" && (
                          <span>
                            System settings updated
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(log.createdAt)}</span>
                        </div>
                        
                        {log.userEmail && (
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>User: {log.userEmail}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
