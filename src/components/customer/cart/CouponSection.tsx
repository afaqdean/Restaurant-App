interface CouponSectionProps {
  couponCode: string;
  onCouponCodeChange: (code: string) => void;
  onApplyCoupon: () => void;
  appliedCoupon?: {
    code: string;
    discount: number;
  };
  onRemoveCoupon: () => void;
  formatPrice: (cents: number) => string;
}

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
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onApplyCoupon();
          }}
          className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Apply
        </button>
      </div>
      
      {appliedCoupon && (
        <div className="mt-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-emerald-800">
              {appliedCoupon.code} applied
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onRemoveCoupon();
              }}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
            >
              Remove
            </button>
          </div>
          <p className="text-sm font-bold text-emerald-600">
            -{formatPrice(appliedCoupon.discount)}
          </p>
        </div>
      )}
    </div>
  );
}
