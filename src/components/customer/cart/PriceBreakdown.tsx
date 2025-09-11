interface PriceBreakdownProps {
  subtotal: number;
  tax: number;
  serviceFee: number;
  discount: number;
  total: number;
  formatPrice: (cents: number) => string;
}

export function PriceBreakdown({
  subtotal,
  tax,
  serviceFee,
  discount,
  total,
  formatPrice,
}: PriceBreakdownProps) {
  return (
    <div className="space-y-3 mb-6">
      <div className="flex justify-between text-sm py-2">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm py-2">
        <span className="text-gray-600">Tax</span>
        <span className="font-medium">{formatPrice(tax)}</span>
      </div>
      <div className="flex justify-between text-sm py-2">
        <span className="text-gray-600">Service Fee</span>
        <span className="font-medium">{formatPrice(serviceFee)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-sm py-2 text-emerald-600">
          <span>Discount</span>
          <span className="font-bold">-{formatPrice(discount)}</span>
        </div>
      )}
      <div className="border-t border-gray-200 pt-3">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-emerald-600">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
