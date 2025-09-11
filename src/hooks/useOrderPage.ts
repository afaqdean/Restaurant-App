import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

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
    provider: string;
    amount: number;
    status: string;
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

export function useOrderPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = params.id as string;
  const paymentType = searchParams.get("payment");
  const clientSecret = searchParams.get("client_secret");

  // Use React Query to fetch order data
  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrder(orderId),
    enabled: !!orderId, // Only run query if orderId exists
    staleTime: 30000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
  });

  const order = data?.order || null;

  const formatPrice = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "ACCEPTED":
        return "bg-blue-100 text-blue-800";
      case "IN_KITCHEN":
        return "bg-orange-100 text-orange-800";
      case "READY":
        return "bg-emerald-100 text-emerald-800";
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-emerald-100 text-emerald-800";
      case "UNPAID":
        return "bg-yellow-100 text-yellow-800";
      case "REFUNDED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return {
    // Data
    order,

    // State
    loading,
    error: error?.message || null,

    // URL params
    orderId,
    paymentType,
    clientSecret,

    // Actions
    refetch,

    // Utils
    formatPrice,
    getStatusColor,
    getPaymentStatusColor,
  };
}
