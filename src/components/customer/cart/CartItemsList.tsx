import { ShoppingCart } from "lucide-react";
import { CartItemCard } from "./CartItemCard";
import { CartItemWithDetails } from "@/types/cart";

interface CartItemsListProps {
  items: CartItemWithDetails[];
  notes: Record<string, string>;
  isLoading: boolean;
  onQuantityChange: (itemId: string, newQuantity: number, e?: React.MouseEvent) => void;
  onNotesChange: (itemId: string, newNotes: string) => void;
  onOpenCustomization: (item: CartItemWithDetails) => void;
  onRemove: (itemId: string) => void;
  formatPrice: (cents: number) => string;
}

export function CartItemsList({
  items,
  notes,
  isLoading,
  onQuantityChange,
  onNotesChange,
  onOpenCustomization,
  onRemove,
  formatPrice,
}: CartItemsListProps) {
  return (
    <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="200">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <ShoppingCart className="w-6 h-6 mr-3 text-emerald-600" />
            Cart Items ({items.length})
          </h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {items.map((item, index) => (
              <CartItemCard
                key={item.itemId}
                item={item}
                notes={notes[item.itemId] || item.notes || ""}
                isLoading={isLoading}
                onQuantityChange={onQuantityChange}
                onNotesChange={onNotesChange}
                onOpenCustomization={onOpenCustomization}
                onRemove={onRemove}
                formatPrice={formatPrice}
                dataAosDelay={300 + (index * 100)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
