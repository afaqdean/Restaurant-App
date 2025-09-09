"use client";

import { useState } from "react";
import { MenuItem, ItemOptionGroup } from "@/types/menu";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

interface ItemDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}


export default function ItemDetailModal({ item, isOpen, onClose }: ItemDetailModalProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, string[]>>({});
  const [addingToCart, setAddingToCart] = useState(false);

  // Get customizations from the item data
  const customizations: ItemOptionGroup[] = item?.optionGroups || [];

  const handleCustomizationChange = (customizationId: string, optionId: string, checked: boolean) => {
    setSelectedCustomizations(prev => {
      const current = prev[customizationId] || [];
      const customization = customizations.find(c => c.id === customizationId);
      
      if (!customization) return prev;

      let newSelection;
      if (checked) {
        if (!customization.multiple) {
          // Single selection - replace current selection
          newSelection = [optionId];
        } else {
          // Multiple selection - add to current
          newSelection = [...current, optionId];
        }
      } else {
        // Remove from selection
        newSelection = current.filter(id => id !== optionId);
      }

      return {
        ...prev,
        [customizationId]: newSelection
      };
    });
  };

  const calculateTotalPrice = () => {
    if (!item) return 0;

    let basePrice = item.price; // price is in cents
    
    // Add customization prices
    Object.values(selectedCustomizations).forEach(optionIds => {
      optionIds.forEach(optionId => {
        customizations.forEach(customization => {
          const option = customization.options.find(opt => opt.id === optionId);
          if (option) {
            basePrice += option.price; // option.price is also in cents
          }
        });
      });
    });

    return (basePrice * quantity) / 100; // convert to dollars for display
  };

  const handleAddToCart = async () => {
    if (!item) return;

    setAddingToCart(true);
    
    try {
      await addToCart(item.id, quantity);
      onClose();
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setAddingToCart(false);
    }
  };

  const isAddToCartDisabled = () => {
    // Check if required customizations are selected
    return customizations.some(customization => 
      customization.required && (!selectedCustomizations[customization.id] || selectedCustomizations[customization.id].length === 0)
    );
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Image */}
          {item.image ? (
            <div className="relative h-48 w-full rounded-xl overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-48 w-full rounded-xl bg-gradient-to-br from-emerald-100 to-teal-200 flex items-center justify-center">
              <div className="text-center text-emerald-600">
                <div className="text-4xl mb-2">🍽️</div>
                <p className="text-sm font-medium">No Image</p>
              </div>
            </div>
          )}

          {/* Description */}
          {item.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          )}

          {/* Customizations */}
          {customizations.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Customize Your Order</h3>
              <div className="space-y-3">
                {customizations.map((customization) => (
                  <div key={customization.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{customization.name}</h4>
                      {customization.required && (
                        <span className="text-xs text-red-500">Required</span>
                      )}
                      {customization.multiple && (
                        <span className="text-xs text-gray-500">
                          Multiple allowed
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      {customization.options.map((option) => {
                        const isSelected = selectedCustomizations[customization.id]?.includes(option.id) || false;

                        return (
                          <label
                            key={option.id}
                            className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-colors ${
                              isSelected
                                ? "border-emerald-500 bg-emerald-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center">
                              <input
                                type={customization.multiple ? "checkbox" : "radio"}
                                name={customization.id}
                                checked={isSelected}
                                onChange={(e) => handleCustomizationChange(customization.id, option.id, e.target.checked)}
                                className="mr-2"
                              />
                              <span className="text-sm font-medium text-gray-900">{option.name}</span>
                            </div>
                            {option.price > 0 && (
                              <span className="text-sm text-emerald-600 font-medium">
                                +{option.formattedPrice}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-900">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-1 border-x border-gray-300 min-w-[2rem] text-center text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-emerald-600">
                ${calculateTotalPrice().toFixed(2)}
              </div>
              {quantity > 1 && (
                <div className="text-xs text-gray-500">
                  ${(calculateTotalPrice() / quantity).toFixed(2)} each
                </div>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={addingToCart || isAddToCartDisabled()}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {addingToCart ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding to Cart...
              </>
            ) : (
              "Add to Cart"
            )}
          </button>

          {isAddToCartDisabled() && (
            <p className="text-xs text-red-500 text-center">
              Please select all required customizations
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
