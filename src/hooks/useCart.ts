import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CartSummary } from "@/types/cart";

// API functions
async function fetchCart(): Promise<{ cart: CartSummary }> {
  const response = await fetch("/api/cart");

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch cart");
  }

  return response.json();
}

async function addToCart(
  itemId: string,
  quantity: number,
  notes?: string,
  selectedOptions?: { id: string; name: string; price: number }[]
) {
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

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to add item to cart");
  }

  return response.json();
}

async function updateCartItem(
  itemId: string,
  quantity: number,
  notes?: string,
  selectedOptions?: { id: string; name: string; price: number }[]
) {
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

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update cart item");
  }

  return response.json();
}

async function removeFromCart(itemId: string) {
  return updateCartItem(itemId, 0);
}

async function applyCoupon(code: string) {
  const response = await fetch("/api/cart/coupon", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to apply coupon");
  }

  return response.json();
}

async function removeCoupon() {
  const response = await fetch("/api/cart/coupon", {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to remove coupon");
  }

  return response.json();
}

async function clearCart() {
  const response = await fetch("/api/cart", {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to clear cart");
  }

  return response.json();
}

// Query keys
export const cartKeys = {
  all: ["cart"] as const,
  summary: () => [...cartKeys.all, "summary"] as const,
};

// Custom hooks
export function useCart() {
  return useQuery({
    queryKey: cartKeys.summary(),
    queryFn: fetchCart,
    staleTime: 0, // Always fetch fresh cart data
    gcTime: 0, // Don't cache cart data
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      quantity,
      notes,
      selectedOptions,
    }: {
      itemId: string;
      quantity: number;
      notes?: string;
      selectedOptions?: { id: string; name: string; price: number }[];
    }) => addToCart(itemId, quantity, notes, selectedOptions),
    onSuccess: () => {
      // Invalidate and refetch cart data
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      quantity,
      notes,
      selectedOptions,
    }: {
      itemId: string;
      quantity: number;
      notes?: string;
      selectedOptions?: { id: string; name: string; price: number }[];
    }) => updateCartItem(itemId, quantity, notes, selectedOptions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => removeFromCart(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}

export function useApplyCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => applyCoupon(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}

export function useRemoveCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}
