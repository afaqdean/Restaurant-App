import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useSession } from "next-auth/react";
import { CartItemWithDetails } from "@/types/cart";

export function useCartPage() {
  const {
    state,
    updateCartItem,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCart();
  const { data: session } = useSession();
  const [couponCode, setCouponCode] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [customizationModal, setCustomizationModal] = useState<{
    isOpen: boolean;
    item: CartItemWithDetails | null;
  }>({ isOpen: false, item: null });

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const handleQuantityChange = async (
    itemId: string,
    newQuantity: number,
    e?: React.MouseEvent
  ) => {
    e?.preventDefault();
    if (newQuantity === 0) {
      await removeFromCart(itemId);
    } else {
      await updateCartItem(itemId, newQuantity, notes[itemId]);
    }
  };

  const handleNotesChange = async (itemId: string, newNotes: string) => {
    setNotes((prev) => ({ ...prev, [itemId]: newNotes }));
    const item = state.cart?.items.find((i) => i.itemId === itemId);
    if (item) {
      await updateCartItem(itemId, item.quantity, newNotes);
    }
  };

  const handleApplyCoupon = async () => {
    if (couponCode.trim()) {
      await applyCoupon(couponCode.trim());
      setCouponCode("");
    }
  };

  const handleOpenCustomization = (item: CartItemWithDetails) => {
    setCustomizationModal({ isOpen: true, item });
  };

  const handleCloseCustomization = () => {
    setCustomizationModal({ isOpen: false, item: null });
  };

  const handleSaveCustomization = async (
    itemId: string,
    quantity: number,
    notes: string,
    selectedOptions: { optionId: string; groupId: string }[]
  ) => {
    await updateCartItem(itemId, quantity, notes, selectedOptions);
  };

  return {
    // State
    state,
    session,
    couponCode,
    notes,
    customizationModal,

    // Actions
    setCouponCode,
    handleQuantityChange,
    handleNotesChange,
    handleApplyCoupon,
    handleOpenCustomization,
    handleCloseCustomization,
    handleSaveCustomization,
    removeFromCart,
    removeCoupon,
    clearCart,

    // Utils
    formatPrice,
  };
}
