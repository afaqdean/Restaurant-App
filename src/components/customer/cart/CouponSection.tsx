import { PrimaryButton, CartActionButton } from "@/components/ui/buttons";
import { CouponSectionProps } from "@/types/customer-components";

export function CouponSection({
  couponCode,
  onCouponCodeChange,
  onApplyCoupon,
  appliedCoupon,
  onRemoveCoupon,
  formatPrice,
}: CouponSectionProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Coupon Code
      </label>
      <div className="flex space-x-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => onCouponCodeChange(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        />
        <PrimaryButton
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onApplyCoupon();
          }}
          size="sm"
          className="shadow-md hover:shadow-lg"
        >
          Apply
        </PrimaryButton>
      </div>
      
      {appliedCoupon && (
        <div className="mt-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-emerald-800">
              {appliedCoupon.code} applied
            </span>
            <CartActionButton
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onRemoveCoupon();
              }}
              action="remove"
              variant="text"
              size="sm"
            >
              Remove
            </CartActionButton>
          </div>
          <p className="text-sm font-bold text-emerald-600">
            -{formatPrice(appliedCoupon.discount)}
          </p>
        </div>
      )}
    </div>
  );
}
