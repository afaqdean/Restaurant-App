"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReceiptButton } from "@/components/ui/ReceiptButton";
import { PageLoadingState, PageErrorState } from "@/components/ui/StandardStates";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  customerName: string;
  customerEmail: string;
  total: number;
  createdAt: string;
  items: Array<{
    id: string;
    quantity: number;
    item: {
      id: string;
      name: string;
    };
  }>;
  payments: Array<{
    id: string;
    provider: string;
    amount: number;
    status: string;
  }>;
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-yellow-100 text-yellow-800";
      case "ACCEPTED": return "bg-blue-100 text-blue-800";
      case "IN_KITCHEN": return "bg-orange-100 text-orange-800";
      case "READY": return "bg-green-100 text-green-800";
      case "COMPLETED": return "bg-green-100 text-green-800";
      case "CANCELLED": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID": return "bg-green-100 text-green-800";
      case "UNPAID": return "bg-yellow-100 text-yellow-800";
      case "REFUNDED": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
        await fetchOrders();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update order status");
      }
    } catch (error) {
      alert("Network error");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const confirmCodPayment = async (orderId: string) => {
    try {
      const response = await fetch("/api/payments/cod/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, confirmed: true }),
      });

      if (response.ok) {
        await fetchOrders();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to confirm payment");
      }
    } catch (error) {
      alert("Network error");
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);
      if (paymentMethodFilter) params.append("paymentMethod", paymentMethodFilter);
      
      const url = `/api/orders${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        setOrders(data.orders);
      } else {
        setError(data.error || "Failed to fetch orders");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, paymentMethodFilter]);

  if (loading) {
    return <PageLoadingState message="Loading orders..." />;
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Filter
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="IN_KITCHEN">In Kitchen</option>
                <option value="READY">Ready</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Methods</option>
                <option value="CARD">Credit/Debit Card</option>
                <option value="COD">Cash on Delivery</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setStatusFilter("");
                  setPaymentMethodFilter("");
                }}
                className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          #{order.orderNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customerEmail}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">
                          {order.paymentMethod === "CARD" ? "Card" : "COD"}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => router.push(`/admin/orders/${order.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        <ReceiptButton 
                          orderId={order.id} 
                          orderNumber={order.orderNumber}
                          variant="outline"
                          size="sm"
                        />
                        
                        {/* Status Update Dropdown */}
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          disabled={updatingStatus === order.id}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="ACCEPTED">Accepted</option>
                          <option value="IN_KITCHEN">In Kitchen</option>
                          <option value="READY">Ready</option>
                          <option value="COMPLETED">Completed</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                        
                        {/* COD Payment Confirmation */}
                        {order.paymentMethod === "COD" && order.paymentStatus === "UNPAID" && (
                          <button
                            onClick={() => confirmCodPayment(order.id)}
                            className="text-green-600 hover:text-green-900 text-sm"
                          >
                            Confirm Payment
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {orders.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Orders Found</h2>
            <p className="text-gray-600">No orders match the current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
