import { memo } from "react";
import Image from "next/image";
import { Plus, Minus, Trash2, Edit3 } from "lucide-react";
import { CartActionButton, QuantityButton } from "@/components/ui/buttons";
import { CartItemCardProps } from "@/types/customer-components";

export const CartItemCard = memo(function CartItemCard({
  item,
  notes,
  isLoading,
  onQuantityChange,
  onNotesChange,
  onOpenCustomization,
  onRemove,
  formatPrice,
  dataAosDelay = 0,
}: CartItemCardProps) {
  return (
    <div 
      className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300"
      data-aos="fade-up"
      data-aos-delay={dataAosDelay}
    >
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Image
            src={item.item.image || "/images/placeholder.jpg"}
            alt={item.item.name}
            width={100}
            height={100}
            className="w-24 h-24 object-cover rounded-xl shadow-sm"
          />
          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {item.quantity}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{item.item.name}</h3>
              <p className="text-sm text-emerald-600 font-medium">{item.item.category.name}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-900">{formatPrice(item.totalPrice)}</p>
              <p className="text-sm text-gray-500">{formatPrice(item.item.price)} each</p>
            </div>
          </div>
          
          {/* Selected Options */}
          {item.selectedOptions.length > 0 && (
            <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Edit3 className="w-4 h-4 mr-1" />
                Customizations:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                {item.selectedOptions.map((option, optionIndex) => (
                  <li key={optionIndex} className="flex justify-between">
                    <span>{option.option.name}</span>
                    {option.option.price > 0 && (
                      <span className="text-emerald-600 font-medium">
                        +{formatPrice(option.option.price)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Edit Button */}
          <div className="mb-4">
            <CartActionButton
              onClick={() => onOpenCustomization(item)}
              action="edit"
              variant="text"
              size="sm"
            >
              Edit Customizations
            </CartActionButton>
          </div>
          
          {/* Notes */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Special Instructions
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => onNotesChange(item.itemId, e.target.value)}
              placeholder="e.g., No pickles, Extra spicy"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>
          
          {/* Quantity Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <QuantityButton
                type="decrement"
                onClick={(e) => onQuantityChange(item.itemId, item.quantity - 1, e)}
                disabled={isLoading}
                isLoading={isLoading}
              >
                -
              </QuantityButton>
              <span className="w-8 text-center text-lg font-semibold">{item.quantity}</span>
              <QuantityButton
                type="increment"
                onClick={(e) => onQuantityChange(item.itemId, item.quantity + 1, e)}
                disabled={isLoading}
                isLoading={isLoading}
              >
                +
              </QuantityButton>
            </div>
            
            <CartActionButton
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onRemove(item.itemId);
              }}
              disabled={isLoading}
              action="remove"
              variant="destructive"
              size="sm"
            >
              Remove
            </CartActionButton>
          </div>
        </div>
      </div>
    </div>
  );
});
