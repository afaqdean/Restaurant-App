import { Order } from "./order";
import { CartSummary, CartItemWithDetails } from "./cart";
import { MenuItem, Category } from "./menu";

// Checkout form data
export interface CheckoutFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: "CARD" | "COD";
  notes: string;
}

// Checkout form props
export interface CheckoutFormProps {
  formData: CheckoutFormData;
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
  cartLoading?: boolean;
}

// Checkout summary props
export interface CheckoutSummaryProps {
  cart: CartSummary;
  formatPrice: (cents: number) => string;
}

// Payment form props
export interface PaymentFormProps {
  clientSecret: string;
  paymentStatus: "processing" | "success" | "failed";
  paymentError: string;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
  onRetryPayment: () => void;
}

// Payment summary props
export interface PaymentSummaryProps {
  order: Order;
  formatPrice: (cents: number) => string;
}

// Order details props
export interface OrderDetailsProps {
  order: Order;
  formatPrice: (cents: number) => string;
}

// Order summary props
export interface OrderSummaryProps {
  order: Order;
  formatPrice: (cents: number) => string;
}

// Hero component props
export interface HeroProps {
  title: string | React.ReactNode;
  subtitle?: string;
  className?: string;
  variant?: "simple" | "restaurant" | "menu";
  background?: "none" | "dark" | "gradient";
  children?: React.ReactNode; // For custom content like buttons, 3D elements
  titleClassName?: string;
  subtitleClassName?: string;
}

// Menu item card props
export interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem) => void;
  onItemClick?: (item: MenuItem) => void;
  addingToCart?: boolean;
  showFeatured?: boolean;
  className?: string;
  "data-aos"?: string;
  "data-aos-delay"?: string | number;
}

// Menu category slider props
export interface MenuCategorySliderProps {
  category: Category;
  sliderPosition: number;
  onGoToSlide: (direction: "prev" | "next") => void;
  onItemClick: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  addingToCart: boolean;
  className?: string;
}

// Menu filters props
export interface MenuFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  categories: Category[];
  onSearchChange: (query: string) => void;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

// Menu empty state props
export interface MenuEmptyStateProps {
  searchQuery: string;
  selectedCategory: string;
  onClearFilters: () => void;
  className?: string;
}

// Cart item card props
export interface CartItemCardProps {
  item: CartItemWithDetails;
  notes: string;
  isLoading: boolean;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onNotesChange: (itemId: string, notes: string) => void;
  onOpenCustomization: (item: CartItemWithDetails) => void;
  onRemove: (itemId: string) => void;
  formatPrice: (cents: number) => string;
}

// Cart items list props
export interface CartItemsListProps {
  items: CartItemWithDetails[];
  notes: Record<string, string>;
  isLoading: boolean;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onNotesChange: (itemId: string, notes: string) => void;
  onOpenCustomization: (item: CartItemWithDetails) => void;
  onRemove: (itemId: string) => void;
  formatPrice: (cents: number) => string;
}

// Order summary props (for cart)
export interface CartOrderSummaryProps {
  cart: CartSummary;
  couponCode: string;
  onCouponCodeChange: (code: string) => void;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
  onClearCart: () => void;
  formatPrice: (cents: number) => string;
  isAuthenticated: boolean;
}

// Price breakdown props
export interface PriceBreakdownProps {
  cart: CartSummary;
  formatPrice: (cents: number) => string;
}

// Coupon section props
export interface CouponSectionProps {
  couponCode: string;
  onCouponCodeChange: (code: string) => void;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
  appliedCoupon?: CartSummary["appliedCoupon"];
  formatPrice: (cents: number) => string;
}

// Cart actions props
export interface CartActionsProps {
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  isLoading: boolean;
}

// Selected option type for customizations
export interface SelectedOption {
  optionId: string;
  groupId: string;
}

// Item customization modal props
export interface ItemCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CartItemWithDetails | MenuItem | null;
  onSave?: (
    itemId: string,
    quantity: number,
    notes: string,
    selectedOptions: SelectedOption[]
  ) => Promise<void>;
  onAddToCart?: (
    item: MenuItem,
    quantity: number,
    selectedOptions: SelectedOption[],
    notes: string
  ) => Promise<void>;
}

// Stripe payment form props
export interface StripePaymentFormProps {
  clientSecret: string;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
}

// Receipt button props
export interface ReceiptButtonProps {
  orderId: string;
  orderNumber: string;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Auth required props
export interface AuthRequiredProps {
  title: string | React.ReactNode;
  subtitle: string;
  signInUrl: string;
  signUpUrl: string;
  backUrl?: string;
  backText?: string;
  className?: string;
}

// Standard states props
export interface PageLoadingStateProps {
  message: string;
  className?: string;
}

export interface PageErrorStateProps {
  message: string;
  onRetry: () => void;
  className?: string;
}

export interface CartEmptyStateProps {
  onBrowseMenu: () => void;
  onGoHome: () => void;
  className?: string;
}
