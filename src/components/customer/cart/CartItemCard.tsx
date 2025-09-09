import Image from "next/image";
import { Plus, Minus, Trash2, Edit3 } from "lucide-react";
import { CartItemWithDetails } from "@/types/cart";

interface CartItemCardProps {
  item: CartItemWithDetails;
  notes: string;
  isLoading: boolean;
  onQuantityChange: (itemId: string, newQuantity: number, e?: React.MouseEvent) => void;
  onNotesChange: (itemId: string, newNotes: string) => void;
  onOpenCustomization: (item: CartItemWithDetails) => void;
  onRemove: (itemId: string) => void;
  formatPrice: (cents: number) => string;
  dataAosDelay?: number;
}

export function CartItemCard({
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
            <button
              onClick={() => onOpenCustomization(item)}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center hover:underline"
            >
              <Edit3 className="w-4 h-4 mr-1" />
              Edit Customizations
            </button>
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
              <button
                type="button"
                onClick={(e) => onQuantityChange(item.itemId, item.quantity - 1, e)}
                disabled={isLoading}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Minus className="w-4 h-4" />
                )}
              </button>
              <span className="w-8 text-center text-lg font-semibold">{item.quantity}</span>
              <button
                type="button"
                onClick={(e) => onQuantityChange(item.itemId, item.quantity + 1, e)}
                disabled={isLoading}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>
            </div>
            
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onRemove(item.itemId);
              }}
              disabled={isLoading}
              className="text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-medium hover:underline transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
