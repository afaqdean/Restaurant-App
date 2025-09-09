"use client";

import { useState, useEffect } from "react";
import { MenuItem as MenuItemType } from "@/types/menu";
import { CartItemWithDetails } from "@/types/cart";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ItemCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CartItemWithDetails | MenuItemType | null;
  onSave?: (itemId: string, quantity: number, notes: string, selectedOptions: { optionId: string; groupId: string }[]) => Promise<void>;
  onAddToCart?: (item: MenuItemType, quantity: number, selectedOptions: { optionId: string; groupId: string }[], notes: string) => Promise<void>;
}

export function ItemCustomizationModal({ isOpen, onClose, item, onSave, onAddToCart }: ItemCustomizationModalProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<{ optionId: string; groupId: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // Check if item is CartItemWithDetails or MenuItem
  const isCartItem = item && 'item' in item;
  const menuItem = isCartItem ? (item as CartItemWithDetails).item : item as MenuItemType;

  // Reset state when modal opens/closes or item changes
  useEffect(() => {
    if (isOpen && item) {
      if (isCartItem) {
        const cartItem = item as CartItemWithDetails;
        setQuantity(cartItem.quantity);
        setNotes(cartItem.notes || "");
        setSelectedOptions(cartItem.selectedOptions.map(opt => ({ optionId: opt.optionId, groupId: opt.groupId })));
      } else {
        setQuantity(1);
        setNotes("");
        setSelectedOptions([]);
      }
    }
  }, [isOpen, item, isCartItem]);

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const handleOptionChange = (groupId: string, optionId: string, isMultiple: boolean) => {
    setSelectedOptions(prev => {
      if (isMultiple) {
        // For multiple selection groups, toggle the option
        const existingIndex = prev.findIndex(opt => opt.groupId === groupId && opt.optionId === optionId);
        if (existingIndex >= 0) {
          return prev.filter((_, index) => index !== existingIndex);
        } else {
          return [...prev, { groupId, optionId }];
        }
      } else {
        // For single selection groups, replace the option
        return prev.filter(opt => opt.groupId !== groupId).concat([{ groupId, optionId }]);
      }
    });
  };

  const isOptionSelected = (groupId: string, optionId: string) => {
    return selectedOptions.some(opt => opt.groupId === groupId && opt.optionId === optionId);
  };

  const isAddToCartDisabled = () => {
    if (!menuItem) return true;
    
    // Check if required customizations are selected
    return menuItem.optionGroups.some(group => 
      group.required && !selectedOptions.some(opt => opt.groupId === group.id)
    );
  };

  const calculateTotalPrice = () => {
    if (!menuItem) return 0;
    
    let total = menuItem.price * quantity;
    
    // Add option prices
    selectedOptions.forEach(selectedOpt => {
      const optionGroup = menuItem.optionGroups.find(group => group.id === selectedOpt.groupId);
      if (optionGroup) {
        const option = optionGroup.options.find(opt => opt.id === selectedOpt.optionId);
        if (option) {
          total += option.price * quantity;
        }
      }
    });
    
    return total;
  };

  const handleSave = async () => {
    if (!item || !menuItem) return;
    
    setLoading(true);
    try {
      if (isCartItem && onSave) {
        // Update existing cart item
        await onSave((item as CartItemWithDetails).itemId, quantity, notes, selectedOptions);
      } else if (!isCartItem && onAddToCart) {
        // Add new item to cart
        await onAddToCart(menuItem, quantity, selectedOptions, notes);
      } else if (!isCartItem) {
        // Fallback to default addToCart
        await addToCart(menuItem.id, quantity);
      }
      onClose();
    } catch (error) {
      console.error("Error saving item:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">
            Customize Item
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Item Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-start space-x-4">
              <img
                src={menuItem?.image || "/images/placeholder.jpg"}
                alt={menuItem?.name || ""}
                className="w-24 h-24 object-cover rounded-xl shadow-sm"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{menuItem?.name}</h3>
                <p className="text-sm text-emerald-600 font-medium mb-2">{menuItem?.category.name}</p>
                <p className="text-sm text-gray-600">{menuItem?.description}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-emerald-600">{formatPrice(menuItem?.price || 0)}</p>
                <p className="text-sm text-gray-500">base price</p>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-xl font-bold text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                disabled={quantity >= 10}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Customization Options */}
          {menuItem?.optionGroups && menuItem.optionGroups.length > 0 && (
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-gray-900 flex items-center">
                <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-emerald-600 text-sm">⚙️</span>
                </div>
                Customizations
              </h4>
              {menuItem.optionGroups.map((group) => (
                <div key={group.id} className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {group.name}
                    {group.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <div className="space-y-3">
                    {group.options.map((option) => (
                      <label key={option.id} className="flex items-center space-x-3 cursor-pointer p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200">
                        <input
                          type={group.multiple ? "checkbox" : "radio"}
                          name={group.id}
                          checked={isOptionSelected(group.id, option.id)}
                          onChange={() => handleOptionChange(group.id, option.id, group.multiple)}
                          className="text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                        />
                        <div className="flex-1 flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">{option.name}</span>
                          {option.price > 0 && (
                            <span className="text-sm font-bold text-emerald-600">
                              +{formatPrice(option.price)}
                            </span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Special Instructions
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., No pickles, Extra spicy, Well done"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
            />
          </div>

          {/* Total Price */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-3xl font-bold text-emerald-600">{formatPrice(calculateTotalPrice())}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Including all customizations and quantity</p>
          </div>

          {/* Validation Message */}
          {isAddToCartDisabled() && !isCartItem && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600 text-center">
                Please select all required customizations
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-4 p-6 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading || isAddToCartDisabled()}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 disabled:from-emerald-400 disabled:to-teal-400 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                {isCartItem ? "Saving..." : "Adding..."}
              </div>
            ) : (
              isCartItem ? "Update Item" : "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
