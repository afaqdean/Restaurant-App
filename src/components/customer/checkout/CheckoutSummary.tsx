import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { CheckoutSummaryProps } from "@/types/components";

export function CheckoutSummary({ cart, formatPrice }: CheckoutSummaryProps) {
  return (
    <div className="lg:col-span-1" data-aos="fade-up" data-aos-delay="300">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-8 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-emerald-600 font-bold">$</span>
            </div>
            Order Summary
          </h2>
        </div>
        
        <div className="p-6">
          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Items ({cart.items.length})</h3>
            <div className="space-y-3">
              {cart.items.map((item) => (
                <div key={item.itemId} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <Image
                    src={item.item.image || "/images/placeholder.jpg"}
                    alt={item.item.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{item.item.name}</h4>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{formatPrice(item.totalPrice)}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Price Breakdown */}
          <div className="space-y-3 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Price Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm py-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatPrice(cart.tax)}</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-gray-600">Service Fee</span>
                <span className="font-medium">{formatPrice(cart.serviceFee)}</span>
              </div>
              {cart.discount > 0 && (
                <div className="flex justify-between text-sm py-2 text-emerald-600">
                  <span>Discount</span>
                  <span className="font-bold">-{formatPrice(cart.discount)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-emerald-600">{formatPrice(cart.total)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Applied Coupon */}
          {cart.appliedCoupon && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-emerald-600 text-xs font-bold">✓</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800">
                    Coupon &quot;{cart.appliedCoupon.code}&quot; applied
                  </p>
                  <p className="text-sm text-emerald-600">
                    You saved {formatPrice(cart.appliedCoupon.discount)}!
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Back to Cart */}
          <Link
            href="/cart"
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors font-medium flex items-center justify-center group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Cart
          </Link>
          
          <Link
            href="/menu"
            className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-emerald-300 transition-all duration-300 font-medium flex items-center justify-center mt-3"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
