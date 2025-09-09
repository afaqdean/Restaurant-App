"use client";

import { useState, useEffect } from "react";
import { MenuItem as MenuItemType } from "@/types/menu";
import { CartItemWithDetails } from "@/types/cart";
import { X, Plus, Minus } from "lucide-react";

interface ItemCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CartItemWithDetails;
  onSave: (itemId: string, quantity: number, notes: string, selectedOptions: { optionId: string; groupId: string }[]) => Promise<void>;
}

export function ItemCustomizationModal({ isOpen, onClose, item, onSave }: ItemCustomizationModalProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [notes, setNotes] = useState(item.notes || "");
  const [selectedOptions, setSelectedOptions] = useState<{ optionId: string; groupId: string }[]>(
    item.selectedOptions.map(opt => ({ optionId: opt.optionId, groupId: opt.groupId }))
  );
  const [loading, setLoading] = useState(false);

  // Reset state when modal opens/closes or item changes
  useEffect(() => {
    if (isOpen) {
      setQuantity(item.quantity);
      setNotes(item.notes || "");
      setSelectedOptions(item.selectedOptions.map(opt => ({ optionId: opt.optionId, groupId: opt.groupId })));
    }
  }, [isOpen, item]);

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

  const calculateTotalPrice = () => {
    let total = item.item.price * quantity;
    
    // Add option prices
    selectedOptions.forEach(selectedOpt => {
      const option = item.selectedOptions.find(opt => opt.optionId === selectedOpt.optionId);
      if (option) {
        total += option.option.price * quantity;
      }
    });
    
    return total;
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await onSave(item.itemId, quantity, notes, selectedOptions);
      onClose();
    } catch (error) {
      console.error("Error updating cart item:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Customize Item</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Item Info */}
          <div className="flex items-start space-x-4">
            <img
              src={item.item.image || "/images/placeholder.jpg"}
              alt={item.item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{item.item.name}</h3>
              <p className="text-sm text-gray-600">{item.item.category.name}</p>
              <p className="text-sm text-gray-500 mt-1">{item.item.description}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">{formatPrice(item.item.price)}</p>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                disabled={quantity >= 10}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Customization Options */}
          {item.item.optionGroups && item.item.optionGroups.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">Customizations</h4>
              {item.item.optionGroups.map((group) => (
                <div key={group.id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {group.name}
                    {group.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <div className="space-y-2">
                    {group.options.map((option) => (
                      <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type={group.multiple ? "checkbox" : "radio"}
                          name={group.id}
                          checked={isOptionSelected(group.id, option.id)}
                          onChange={() => handleOptionChange(group.id, option.id, group.multiple)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-gray-900">{option.name}</span>
                          {option.price > 0 && (
                            <span className="text-sm text-gray-600 ml-2">
                              (+{formatPrice(option.price)})
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., No pickles, Extra spicy, Well done"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Total Price */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-xl font-bold text-gray-900">{formatPrice(calculateTotalPrice())}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            {loading ? "Saving..." : "Update Item"}
          </button>
        </div>
      </div>
    </div>
  );
}
