import { useState, useEffect, useCallback, useMemo } from "react";
import { MenuItem } from "@/types/menu";
import { CartItemWithDetails } from "@/types/cart";

interface UseItemCustomizationProps {
  item: CartItemWithDetails | MenuItem | null;
  isOpen: boolean;
}

export function useItemCustomization({
  item,
  isOpen,
}: UseItemCustomizationProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<
    { optionId: string; groupId: string }[]
  >([]);

  // Check if item is CartItemWithDetails or MenuItem
  const isCartItem = item && "item" in item;
  const menuItem = useMemo(() => {
    if (!item) return null;

    if (isCartItem) {
      const cartItem = item as CartItemWithDetails;
      return {
        ...cartItem.item,
        formattedPrice: `$${(cartItem.item.price / 100).toFixed(2)}`,
        active: true,
        featured: false,
        categoryId: cartItem.item.category.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: cartItem.item.category,
        optionGroups: cartItem.item.optionGroups || [],
      } as MenuItem;
    }

    return item as MenuItem;
  }, [item, isCartItem]);

  // Reset state when modal opens/closes or item changes
  useEffect(() => {
    if (isOpen && item) {
      if (isCartItem) {
        const cartItem = item as CartItemWithDetails;
        setQuantity(cartItem.quantity);
        setNotes(cartItem.notes || "");
        setSelectedOptions(
          cartItem.selectedOptions.map((opt) => ({
            optionId: opt.optionId,
            groupId: opt.groupId,
          }))
        );
      } else {
        setQuantity(1);
        setNotes("");
        setSelectedOptions([]);
      }
    }
  }, [isOpen, item, isCartItem]);

  const handleOptionChange = useCallback(
    (groupId: string, optionId: string, isMultiple: boolean) => {
      setSelectedOptions((prev) => {
        if (isMultiple) {
          // For multiple selection groups, toggle the option
          const existingIndex = prev.findIndex(
            (opt) => opt.groupId === groupId && opt.optionId === optionId
          );
          if (existingIndex >= 0) {
            return prev.filter((_, index) => index !== existingIndex);
          } else {
            return [...prev, { groupId, optionId }];
          }
        } else {
          // For single selection groups, replace the option
          return prev
            .filter((opt) => opt.groupId !== groupId)
            .concat([{ groupId, optionId }]);
        }
      });
    },
    []
  );

  const isAddToCartDisabled = useCallback(() => {
    if (!menuItem) return true;

    // Check if required customizations are selected
    return menuItem.optionGroups.some(
      (group) =>
        group.required &&
        !selectedOptions.some((opt) => opt.groupId === group.id)
    );
  }, [menuItem, selectedOptions]);

  return {
    quantity,
    setQuantity,
    notes,
    setNotes,
    selectedOptions,
    setSelectedOptions,
    menuItem,
    isCartItem,
    handleOptionChange,
    isAddToCartDisabled: isAddToCartDisabled(),
  };
}
