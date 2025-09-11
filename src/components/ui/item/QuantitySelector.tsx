import { QuantityButton } from "@/components/ui/buttons";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ 
  quantity, 
  onQuantityChange, 
  min = 1, 
  max = 10 
}: QuantitySelectorProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
      <div className="flex items-center space-x-4">
        <QuantityButton
          type="decrement"
          onClick={() => onQuantityChange(Math.max(min, quantity - 1))}
          disabled={quantity <= min}
          size="md"
        >
          -
        </QuantityButton>
        <span className="w-12 text-center text-xl font-bold text-gray-900">{quantity}</span>
        <QuantityButton
          type="increment"
          onClick={() => onQuantityChange(Math.min(max, quantity + 1))}
          disabled={quantity >= max}
          size="md"
        >
          +
        </QuantityButton>
      </div>
    </div>
  );
}
