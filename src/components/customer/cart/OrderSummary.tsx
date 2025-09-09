import { CouponSection } from "./CouponSection";
import { PriceBreakdown } from "./PriceBreakdown";
import { CartActions } from "./CartActions";

interface OrderSummaryProps {
  cart: {
    subtotal: number;
    tax: number;
    serviceFee: number;
    discount: number;
    total: number;
    appliedCoupon?: {
      code: string;
      discount: number;
    };
  };
  couponCode: string;
  onCouponCodeChange: (code: string) => void;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
  onClearCart: () => void;
  formatPrice: (cents: number) => string;
  isAuthenticated: boolean;
}

export function OrderSummary({
  cart,
  couponCode,
  onCouponCodeChange,
  onApplyCoupon,
  onRemoveCoupon,
  onClearCart,
  formatPrice,
  isAuthenticated,
}: OrderSummaryProps) {
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
          <CouponSection
            couponCode={couponCode}
            onCouponCodeChange={onCouponCodeChange}
            onApplyCoupon={onApplyCoupon}
            appliedCoupon={cart.appliedCoupon}
            onRemoveCoupon={onRemoveCoupon}
            formatPrice={formatPrice}
          />
          
          <PriceBreakdown
            subtotal={cart.subtotal}
            tax={cart.tax}
            serviceFee={cart.serviceFee}
            discount={cart.discount}
            total={cart.total}
            formatPrice={formatPrice}
          />
          
          <CartActions
            isAuthenticated={isAuthenticated}
            onClearCart={onClearCart}
          />
        </div>
      </div>
    </div>
  );
}
