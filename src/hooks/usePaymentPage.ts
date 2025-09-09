import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  notes?: string;
  item: {
    id: string;
    name: string;
    image?: string;
  };
  options: Array<{
    option: {
      id: string;
      name: string;
      price: number;
    };
  }>;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subtotal: number;
  tax: number;
  serviceFee: number;
  discount: number;
  total: number;
  notes?: string;
  createdAt: string;
  items: OrderItem[];
  payments: Array<{
    id: string;
    amount: number;
    status: string;
    method: string;
    provider: string;
    createdAt: string;
  }>;
}

// API function to fetch a single order
async function fetchOrder(orderId: string): Promise<{ order: Order }> {
  const response = await fetch(`/api/orders/${orderId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch order");
  }

  return response.json();
}

export function usePaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();

  const orderId = searchParams.get("order_id");
  const clientSecret = searchParams.get("client_secret");

  const [paymentStatus, setPaymentStatus] = useState<
    "processing" | "success" | "failed"
  >("processing");
  const [paymentError, setPaymentError] = useState("");

  // Use React Query to fetch order data
  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrder(orderId!),
    enabled: !!orderId, // Only run query if orderId exists
    staleTime: 30000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });

  const order = data?.order || null;

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const handlePaymentSuccess = async () => {
    setPaymentStatus("success");
    // Clear cart after successful payment
    try {
      await clearCart();
    } catch (error) {
      console.error("Failed to clear cart after payment:", error);
    }
    // Redirect to order confirmation page after 2 seconds
    setTimeout(() => {
      router.push(`/order/${orderId}?payment=success`);
    }, 2000);
  };

  const handlePaymentError = (error: string) => {
    setPaymentStatus("failed");
    setPaymentError(error);
  };

  const handleRetryPayment = () => {
    setPaymentStatus("processing");
    setPaymentError("");
  };

  // Check for missing payment information
  useEffect(() => {
    if (!orderId || !clientSecret) {
      // This will be handled by the error state in the component
    }
  }, [orderId, clientSecret]);

  return {
    // Data
    order,

    // State
    loading,
    error: error?.message || null,
    paymentStatus,
    paymentError,

    // URL params
    orderId,
    clientSecret,

    // Actions
    handlePaymentSuccess,
    handlePaymentError,
    handleRetryPayment,
    refetch,

    // Utils
    formatPrice,
  };
}
