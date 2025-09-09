import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/contexts/CartContext";
import { CheckoutFormData } from "@/types/components";

export function useCheckoutPage() {
  const { state, refreshCart, clearCart } = useCart();
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    paymentMethod: "COD",
    notes: "",
  });

  // Refresh cart when checkout page loads to ensure we have latest data
  useEffect(() => {
    refreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - refreshCart is memoized and stable

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        customerName: session.user.name || "",
        customerEmail: session.user.email || "",
      }));
    }
  }, [session]);

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.cart || state.cart.items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (
          formData.paymentMethod === "CARD" &&
          data.paymentResult?.clientSecret
        ) {
          // For card payments, don't clear cart yet - let payment page handle it
          // Redirect to dedicated payment page
          router.push(
            `/payment?order_id=${data.orderId}&client_secret=${data.paymentResult.clientSecret}`
          );
        } else {
          // COD order - clear cart and redirect to order confirmation
          await clearCart();
          router.push(`/order/${data.orderId}?payment=cod`);
        }
      } else {
        setError(data.error || "Checkout failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    // State
    state,
    formData,
    loading,
    error,
    session,

    // Actions
    handleInputChange,
    handleSubmit,
    formatPrice,
  };
}
