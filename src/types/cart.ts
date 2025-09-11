import { CartItem } from "@/lib/validations/cart";
import { ItemOptionGroup } from "@/types/menu";

// Cart item with full item details
export interface CartItemWithDetails extends CartItem {
  item: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    category: {
      id: string;
      name: string;
    };
    optionGroups: ItemOptionGroup[];
  };
  selectedOptions: {
    optionId: string;
    groupId: string;
    option: {
      id: string;
      name: string;
      price: number;
      group: {
        id: string;
        name: string;
        required: boolean;
        multiple: boolean;
      };
    };
  }[];
  calculatedPrice: number; // Base price + option prices
  totalPrice: number; // Calculated price * quantity
}

// Cart summary
export interface CartSummary {
  items: CartItemWithDetails[];
  subtotal: number;
  tax: number;
  serviceFee: number;
  discount: number;
  total: number;
  itemCount: number;
  appliedCoupon?: {
    id: string;
    code: string;
    type: "FIXED" | "PERCENTAGE";
    value: number;
    discount: number;
  };
}

// Session cart (stored in memory/session)
export interface SessionCart {
  items: Record<string, CartItem>; // keyed by itemId
  couponCode?: string;
  lastUpdated: Date;
}

// Order calculation result
export interface OrderCalculation {
  subtotal: number;
  tax: number;
  serviceFee: number;
  discount: number;
  total: number;
  appliedCoupon?: {
    id: string;
    code: string;
    type: "FIXED" | "PERCENTAGE";
    value: number;
    discount: number;
  };
}

// Payment processing result
export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  stripePaymentIntentId?: string;
  error?: string;
  requiresAction?: boolean;
  clientSecret?: string;
}

// Order creation result
export interface OrderCreationResult {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  paymentResult?: PaymentResult;
  error?: string;
}
