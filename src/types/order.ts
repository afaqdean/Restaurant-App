// Order item with full details
export interface OrderItem {
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

// Payment information
export interface Payment {
  id: string;
  provider: string;
  amount: number;
  status: string;
}

// Complete order interface
export interface Order {
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
  payments: Payment[];
}

// Order status types
export type OrderStatus =
  | "CART"
  | "PENDING"
  | "ACCEPTED"
  | "IN_KITCHEN"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";
export type PaymentStatus = "PAID" | "UNPAID" | "REFUNDED";
export type PaymentMethod = "CARD" | "COD";

// Order query parameters
export interface OrderQueryParams {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  customerId?: string;
  limit?: number;
  offset?: number;
  sortBy?: "createdAt" | "total" | "status";
  sortOrder?: "asc" | "desc";
}
