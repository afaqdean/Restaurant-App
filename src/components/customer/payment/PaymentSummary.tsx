import Link from "next/link";
import { ArrowLeft, Receipt } from "lucide-react";
import { ImageWithFallback } from "@/components/ui";
import { PaymentSummaryProps } from "@/types/components";

export function PaymentSummary({ order, formatPrice }: PaymentSummaryProps) {
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
              <span className="text-sm font-medium text-emerald-700">Status</span>
              <span className="text-sm font-semibold text-emerald-800 capitalize">{order.status}</span>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Items ({order.items.length})</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    <ImageWithFallback
                      src={item.item.image || "/images/placeholder.png"}
                      alt={item.item.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover rounded-lg"
                      fallbackElement={
                        <span className="text-xs text-gray-500">IMG</span>
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{item.item.name}</h4>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
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
                  <p className="text-sm font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price Breakdown */}
          <div className="space-y-3 mb-6">
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

          {/* Customer Information */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium text-gray-900">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium text-gray-900">{order.customerEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium text-gray-900">{order.customerPhone}</span>
              </div>
              {order.notes && (
                <div className="pt-2 border-t">
                  <span className="text-gray-600 block mb-1">Special Instructions:</span>
                  <span className="text-gray-900 text-sm">{order.notes}</span>
                </div>
              )}
            </div>
          </div>

          {/* Back to Checkout */}
          <div className="pt-4 border-t">
            <Link
              href="/checkout"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
