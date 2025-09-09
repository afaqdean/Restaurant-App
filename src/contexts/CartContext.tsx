"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { CartSummary } from "@/types/cart";

// Type for selected options based on validation schema
interface SelectedOption {
  optionId: string;
  groupId: string;
}

interface CartState {
  cart: CartSummary | null;
  loading: boolean;
  initialLoading: boolean;
  error: string | null;
}

type CartAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_INITIAL_LOADING"; payload: boolean }
  | { type: "SET_CART"; payload: CartSummary }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  cart: null,
  loading: false,
  initialLoading: true,
  error: null,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_INITIAL_LOADING":
      return { ...state, initialLoading: action.payload };
    case "SET_CART":
      return { ...state, cart: action.payload, loading: false, initialLoading: false, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false, initialLoading: false };
    case "CLEAR_CART":
      return { ...state, cart: null, error: null };
    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  addToCart: (itemId: string, quantity: number, notes?: string, selectedOptions?: SelectedOption[]) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number, notes?: string, selectedOptions?: SelectedOption[]) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  removeCoupon: () => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const fetchCart = async () => {
    try {
      dispatch({ type: "SET_INITIAL_LOADING", payload: true });
      const response = await fetch("/api/cart");
      const data = await response.json();
      
      if (response.ok) {
        dispatch({ type: "SET_CART", payload: data.cart });
      } else {
        console.error("Cart fetch failed:", data.error);
        dispatch({ type: "SET_ERROR", payload: data.error || "Failed to fetch cart" });
      }
    } catch (error) {
      console.error("Cart fetch network error:", error);
      dispatch({ type: "SET_ERROR", payload: "Network error" });
    }
  };

  const addToCart = async (itemId: string, quantity: number, notes?: string, selectedOptions?: SelectedOption[]) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId,
          quantity,
          notes,
          selectedOptions,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        dispatch({ type: "SET_CART", payload: data.cart });
      } else {
        dispatch({ type: "SET_ERROR", payload: data.error || "Failed to add item to cart" });
      }
    } catch {
      dispatch({ type: "SET_ERROR", payload: "Network error" });
    }
  };

  const updateCartItem = async (itemId: string, quantity: number, notes?: string, selectedOptions?: SelectedOption[]) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId,
          quantity,
          notes,
          selectedOptions,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        dispatch({ type: "SET_CART", payload: data.cart });
      } else {
        console.error("Cart update failed:", data.error);
        dispatch({ type: "SET_ERROR", payload: data.error || "Failed to update cart item" });
      }
    } catch (error) {
      console.error("Cart update network error:", error);
      dispatch({ type: "SET_ERROR", payload: "Network error" });
    }
  };

  const removeFromCart = async (itemId: string) => {
    await updateCartItem(itemId, 0);
  };

  const applyCoupon = async (code: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetch("/api/cart/coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        dispatch({ type: "SET_CART", payload: data.cart });
      } else {
        dispatch({ type: "SET_ERROR", payload: data.error || "Failed to apply coupon" });
      }
    } catch {
      dispatch({ type: "SET_ERROR", payload: "Network error" });
    }
  };

  const removeCoupon = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetch("/api/cart/coupon", {
        method: "DELETE",
      });
      
      const data = await response.json();
      
      if (response.ok) {
        dispatch({ type: "SET_CART", payload: data.cart });
      } else {
        dispatch({ type: "SET_ERROR", payload: data.error || "Failed to remove coupon" });
      }
    } catch {
      dispatch({ type: "SET_ERROR", payload: "Network error" });
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await fetch("/api/cart", {
        method: "DELETE",
      });
      
      if (response.ok) {
        dispatch({ type: "CLEAR_CART" });
      } else {
        const data = await response.json();
        dispatch({ type: "SET_ERROR", payload: data.error || "Failed to clear cart" });
      }
    } catch {
      dispatch({ type: "SET_ERROR", payload: "Network error" });
    }
  };

  const refreshCart = useCallback(async () => {
    await fetchCart();
  }, []);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        updateCartItem,
        removeFromCart,
        applyCoupon,
        removeCoupon,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
