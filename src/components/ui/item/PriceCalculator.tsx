import { memo, useMemo } from "react";
import { formatPrice } from "@/lib/utils/formatting";
import { MenuItem } from "@/types/menu";

interface PriceCalculatorProps {
  item: MenuItem;
  quantity: number;
  selectedOptions: { optionId: string; groupId: string }[];
}

export const PriceCalculator = memo(function PriceCalculator({ item, quantity, selectedOptions }: PriceCalculatorProps) {
  const totalPrice = useMemo(() => {
    let total = item.price * quantity;
    
    // Add option prices
    selectedOptions.forEach(selectedOpt => {
      const optionGroup = item.optionGroups.find(group => group.id === selectedOpt.groupId);
      if (optionGroup) {
        const option = optionGroup.options.find(opt => opt.id === selectedOpt.optionId);
        if (option) {
          total += option.price * quantity;
        }
      }
    });
    
    return total;
  }, [item.price, item.optionGroups, quantity, selectedOptions]);

  return (
    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-gray-900">Total</span>
        <span className="text-3xl font-bold text-emerald-600">{formatPrice(totalPrice)}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">Including all customizations and quantity</p>
    </div>
  );
});
