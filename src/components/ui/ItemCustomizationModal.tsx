"use client";

import { useState } from "react";
import { MenuItem as MenuItemType } from "@/types/menu";
import { CartItemWithDetails } from "@/types/cart";
import { useCart } from "@/contexts/CartContext";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { Modal, ModalContent, ModalActions } from "@/components/ui/modal";
import { ItemDetails, QuantitySelector, OptionGroups, PriceCalculator, ItemNotes } from "@/components/ui/item";
import { useItemCustomization } from "@/hooks/useItemCustomization";

interface ItemCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CartItemWithDetails | MenuItemType | null;
  onSave?: (itemId: string, quantity: number, notes: string, selectedOptions: { optionId: string; groupId: string }[]) => Promise<void>;
  onAddToCart?: (item: MenuItemType, quantity: number, selectedOptions: { optionId: string; groupId: string }[], notes: string) => Promise<void>;
}

export function ItemCustomizationModal({ isOpen, onClose, item, onSave, onAddToCart }: ItemCustomizationModalProps) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  
  const {
    quantity,
    setQuantity,
    notes,
    setNotes,
    selectedOptions,
    menuItem,
    isCartItem,
    handleOptionChange,
    isAddToCartDisabled,
  } = useItemCustomization({ item, isOpen });

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

  if (!menuItem) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Customize Item">
      <ModalContent>
        <ItemDetails item={menuItem} />
        
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
        />

        <OptionGroups
          optionGroups={menuItem.optionGroups}
          selectedOptions={selectedOptions}
          onOptionChange={handleOptionChange}
        />

        <ItemNotes
          notes={notes}
          onNotesChange={setNotes}
        />

        <PriceCalculator
          item={menuItem}
          quantity={quantity}
          selectedOptions={selectedOptions}
        />

        {/* Validation Message */}
        {isAddToCartDisabled && !isCartItem && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600 text-center">
              Please select all required customizations
            </p>
          </div>
        )}
      </ModalContent>

      <ModalActions>
        <SecondaryButton
          onClick={onClose}
          className="flex-1"
        >
          Cancel
        </SecondaryButton>
        <PrimaryButton
          onClick={handleSave}
          disabled={loading || isAddToCartDisabled}
          isLoading={loading}
          loadingText={isCartItem ? "Saving..." : "Adding..."}
          className="flex-1"
        >
          {isCartItem ? "Update Item" : "Add to Cart"}
        </PrimaryButton>
      </ModalActions>
    </Modal>
  );
}
