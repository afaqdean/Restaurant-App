// Order Types for Customer Pages
export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  total: number;
  createdAt: string;
  customer?: {
    id: string;
    name: string;
    email: string;
  };
  items: Array<{
    id: string;
    quantity: number;
    item: {
      id: string;
      name: string;
      image?: string;
    };
  }>;
  payments?: Array<{
    id: string;
    provider: string;
    amount: number;
    status: string;
  }>;
}

// Order Status Types
export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

// Payment Status Types
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

// Payment Method Types
export type PaymentMethod = "CARD" | "CASH" | "ONLINE";

// Order Page Props
export interface OrderPageProps {
  orderId: string;
}

// Orders Page State
export interface OrdersPageState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

// Payment Page Props
export interface PaymentPageProps {
  orderId: string;
  clientSecret: string;
}

// Cart Page State
export interface CartPageState {
  cart: {
    items: Array<{
      itemId: string;
      quantity: number;
      notes: string;
      customizations: Array<{
        optionGroupId: string;
        optionId: string;
      }>;
    }>;
    subtotal: number;
    tax: number;
    total: number;
    itemCount: number;
  };
  loading: boolean;
  error: string | null;
}

// Checkout Page State
export interface CheckoutPageState {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    specialInstructions: string;
  };
  loading: boolean;
  error: string | null;
}

// Menu Page State
export interface MenuPageState {
  items: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    category: {
      id: string;
      name: string;
    };
    featured: boolean;
  }>;
  categories: Array<{
    id: string;
    name: string;
  }>;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
}
