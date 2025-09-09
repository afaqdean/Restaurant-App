import Link from "next/link";
import { Receipt, CreditCard, ArrowLeft, ShoppingCart } from "lucide-react";
import { OrderSummaryProps } from "@/types/components";

export function OrderSummary({ order, formatPrice }: OrderSummaryProps) {
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "UNPAID": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "REFUNDED": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="lg:col-span-1" data-aos="fade-up" data-aos-delay="300">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-8 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
              <Receipt className="w-4 h-4 text-emerald-600" />
            </div>
            Order Summary
          </h2>
        </div>
        
        <div className="p-6">
          {/* Order Info */}
          <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-emerald-700">Order Number</span>
              <span className="text-sm font-bold text-emerald-900">#{order.orderNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-emerald-700">Date</span>
              <span className="text-sm font-semibold text-emerald-800">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-900">{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service Fee</span>
                <span className="font-medium text-gray-900">{formatPrice(order.serviceFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Discount</span>
                  <span className="font-medium">-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-emerald-600">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                <CreditCard className="w-4 h-4 text-emerald-600" />
              </div>
              Payment Information
            </h3>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Method:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {order.paymentMethod === "CARD" ? "Credit/Debit Card" : "Cash on Delivery"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                {order.payments && order.payments.length > 0 && (
                  <div className="pt-2 border-t">
                    <span className="text-sm text-gray-600 block mb-1">Payment Details:</span>
                    {order.payments.map((payment) => (
                      <div key={payment.id} className="text-xs text-gray-600">
                        {payment.provider}: {formatPrice(payment.amount)} ({payment.status})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/orders"
              className="w-full bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center"
            >
              <Receipt className="w-4 h-4 mr-2" />
              View All Orders
            </Link>
            
            <Link
              href="/menu"
              className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors font-medium flex items-center justify-center"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Order Again
            </Link>

            <Link
              href="/"
              className="w-full text-emerald-600 hover:text-emerald-700 py-2 px-4 font-medium flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
