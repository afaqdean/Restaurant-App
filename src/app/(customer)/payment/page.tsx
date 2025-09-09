"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import StripePaymentForm from "@/components/ui/StripePaymentForm";

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
}

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");
  const clientSecret = searchParams.get("client_secret");
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"processing" | "success" | "failed">("processing");
  const [paymentError, setPaymentError] = useState("");

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  useEffect(() => {
    if (!orderId || !clientSecret) {
      setError("Missing payment information");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();
        
        if (response.ok) {
          setOrder(data.order);
        } else {
          setError(data.error || "Failed to fetch order");
        }
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, clientSecret]);

  const handlePaymentSuccess = () => {
    setPaymentStatus("success");
    // Redirect to order confirmation page after 2 seconds
    setTimeout(() => {
      router.push(`/order/${orderId}?payment=success`);
    }, 2000);
  };

  const handlePaymentError = (error: string) => {
    setPaymentStatus("failed");
    setPaymentError(error);
  };

  const handleRetryPayment = () => {
    setPaymentStatus("processing");
    setPaymentError("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading payment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order || !clientSecret) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Payment Error</h2>
            <p className="text-red-600 mb-4">{error || "Invalid payment session"}</p>
            <Link
              href="/checkout"
              className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Return to Checkout
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Order #{order.orderNumber}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            {/* Payment Status Messages */}
            {paymentStatus === "success" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-green-800 mb-2">Payment Successful!</h2>
                <p className="text-green-600 mb-4">
                  Your payment has been processed successfully. Redirecting to order confirmation...
                </p>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
              </div>
            )}

            {paymentStatus === "failed" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-red-800 mb-2">Payment Failed</h2>
                <p className="text-red-600 mb-4">
                  {paymentError || "Your payment could not be processed. Please try again."}
                </p>
                <button
                  onClick={handleRetryPayment}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            )}

            {paymentStatus === "processing" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">Secure Payment</h2>
                <p className="text-blue-600 mb-4">
                  Enter your card details below to complete your order securely.
                </p>
                <div className="text-sm text-blue-600">
                  <p>Payment Intent: {clientSecret.split('_')[1]}...</p>
                </div>
              </div>
            )}

            {/* Stripe Payment Form */}
            {paymentStatus === "processing" && (
              <StripePaymentForm
                clientSecret={clientSecret}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            )}

            {/* Security Notice */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600">
                  Your payment information is encrypted and secure
                </span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Details */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 border-b pb-3 last:border-b-0">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      {item.options.length > 0 && (
                        <div className="mt-1">
                          <p className="text-xs text-gray-500">Customizations:</p>
                          <ul className="text-xs text-gray-600">
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
                      <p className="font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4">
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
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {order.customerName}</p>
                <p><span className="font-medium">Email:</span> {order.customerEmail}</p>
                <p><span className="font-medium">Phone:</span> {order.customerPhone}</p>
                {order.notes && (
                  <p><span className="font-medium">Special Instructions:</span> {order.notes}</p>
                )}
              </div>
            </div>

            {/* Back to Checkout */}
            <div className="text-center">
              <Link
                href="/checkout"
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                ← Back to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
