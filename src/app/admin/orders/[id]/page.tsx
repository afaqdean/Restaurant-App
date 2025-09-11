"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Clock, 
  User, 
  CreditCard, 
  Banknote, 
  Phone, 
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { ImageWithFallback } from "@/components/ui";
import { ReceiptButton } from "@/components/ui/ReceiptButton";
import { OrderStatusDropdown } from "@/components/ui/OrderStatusDropdown";
import { PageLoadingState, PageErrorState } from "@/components/ui/StandardStates";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subtotal: number;
  tax: number;
  serviceFee: number;
  discount: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    notes?: string;
    item: {
      id: string;
      name: string;
      image?: string;
    };
    options: Array<{
      option: {
        id: string;
        name: string;
        price: number;
      };
    }>;
  }>;
  payments: Array<{
    id: string;
    provider: string;
    amount: number;
    status: string;
    createdAt: string;
  }>;
}

interface OrderStatusHistory {
  id: string;
  status: string;
  createdAt: string;
  notes?: string;
}

export default function AdminOrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [statusHistory, setStatusHistory] = useState<OrderStatusHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [updatingPayment, setUpdatingPayment] = useState(false);

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="w-4 h-4" />;
      case "ACCEPTED": return <CheckCircle className="w-4 h-4" />;
      case "IN_KITCHEN": return <AlertCircle className="w-4 h-4" />;
      case "READY": return <CheckCircle className="w-4 h-4" />;
      case "COMPLETED": return <CheckCircle className="w-4 h-4" />;
      case "CANCELLED": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const updateOrderStatus = async (newStatus: string) => {
    if (!order) return;
    
    setUpdatingStatus(true);
    
    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrder(prev => prev ? { ...prev, status: newStatus } : null);
        await fetchOrder(); // Refresh to get updated data
      } else {
        const data = await response.json();
        alert(data.error || "Failed to update order status");
      }
    } catch (error) {
      alert("Network error");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const confirmCodPayment = async () => {
    if (!order) return;
    
    setUpdatingPayment(true);
    
    try {
      const response = await fetch("/api/payments/cod/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, confirmed: true }),
      });

      if (response.ok) {
        setOrder(prev => prev ? { ...prev, paymentStatus: "PAID" } : null);
        await fetchOrder(); // Refresh to get updated data
      } else {
        const data = await response.json();
        alert(data.error || "Failed to confirm payment");
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "Network error");
    } finally {
      setUpdatingPayment(false);
    }
  };

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();
      
      if (response.ok) {
        setOrder(data.order);
        // Mock status history - in a real app, this would come from the API
        setStatusHistory([
          { id: "1", status: "PENDING", createdAt: data.order.createdAt, notes: "Order placed" },
          { id: "2", status: data.order.status, createdAt: data.order.updatedAt, notes: "Status updated" }
        ]);
      } else {
        setError(data.error || "Failed to fetch order");
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <PageLoadingState message="Loading order details..." />;
  }

  if (error || !order) {
    return (
      <PageErrorState 
        message={error || "Order not found"} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href="/admin/orders"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Orders</span>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
              <p className="text-gray-600">Order #{order.orderNumber}</p>
            </div>
            <ReceiptButton 
              orderId={order.id} 
              orderNumber={order.orderNumber}
              variant="outline"
              size="sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status & Actions */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Order Status</h2>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span>{order.status.replace('_', ' ')}</span>
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
              
              {/* Status Update */}
              <div className="flex items-center space-x-4">
                <OrderStatusDropdown
                  value={order.status}
                  onChange={(value) => updateOrderStatus(value)}
                  disabled={updatingStatus}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 backdrop-blur-sm shadow-lg hover:shadow-xl focus:shadow-xl transition-all duration-200"
                />
                
                {order.paymentMethod === "COD" && order.paymentStatus === "UNPAID" && (
                  <button
                    onClick={confirmCodPayment}
                    disabled={updatingPayment}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm Payment</span>
                  </button>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 border-b pb-4 last:border-b-0">
                    <ImageWithFallback
                      src={item.item.image || "/images/placeholder.png"}
                      alt={item.item.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-lg"
                      fallbackElement={
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-gray-500">IMG</span>
                        </div>
                      }
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      {item.notes && (
                        <p className="text-sm text-gray-600">Note: {item.notes}</p>
                      )}
                      {item.options.length > 0 && (
                        <div className="mt-1">
                          <p className="text-sm font-medium text-gray-700">Customizations:</p>
                          <ul className="text-sm text-gray-600">
                            {item.options.map((option, index) => (
                              <li key={index}>
                                {option.option.name} {option.option.price > 0 && `(+${formatPrice(option.option.price)})`}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{order.customerName}</p>
                    <p className="text-sm text-gray-600">Customer Name</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{order.customerEmail}</p>
                    <p className="text-sm text-gray-600">Email Address</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{order.customerPhone}</p>
                    <p className="text-sm text-gray-600">Phone Number</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {order.paymentMethod === "CARD" ? (
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Banknote className="w-5 h-5 text-gray-400" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.paymentMethod === "CARD" ? "Credit/Debit Card" : "Cash on Delivery"}
                    </p>
                    <p className="text-sm text-gray-600">Payment Method</p>
                  </div>
                </div>
              </div>
              {order.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-1">Special Instructions:</p>
                  <p className="text-sm text-gray-600">{order.notes}</p>
                </div>
              )}
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Order Timeline</h2>
              <div className="space-y-4">
                {statusHistory.map((entry) => (
                  <div key={entry.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        {getStatusIcon(entry.status)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {entry.status.replace('_', ' ')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(entry.createdAt).toLocaleString()}
                      </p>
                      {entry.notes && (
                        <p className="text-sm text-gray-500 mt-1">{entry.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Fee</span>
                  <span>{formatPrice(order.serviceFee)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(order.discount)}</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="border-t pt-4 space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Order Number</p>
                  <p className="text-sm text-gray-900">#{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Order Date</p>
                  <p className="text-sm text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Last Updated</p>
                  <p className="text-sm text-gray-900">
                    {new Date(order.updatedAt).toLocaleDateString()} at {new Date(order.updatedAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* Payment Information */}
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium text-gray-900 mb-2">Payment Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Method</span>
                    <span>{order.paymentMethod === "CARD" ? "Card" : "COD"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
