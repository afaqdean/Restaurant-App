import { ReactNode } from "react";
import { MenuItem, Category } from "./menu";
import { CartItemWithDetails } from "./cart";

// Cart Component Types
export interface CartActionsProps {
  isAuthenticated: boolean;
  onClearCart: () => void;
}

export interface CartItemCardProps {
  item: CartItemWithDetails;
  notes: string;
  isLoading: boolean;
  onQuantityChange: (
    itemId: string,
    newQuantity: number,
    e?: React.MouseEvent
  ) => void;
  onNotesChange: (itemId: string, newNotes: string) => void;
  onOpenCustomization: (item: CartItemWithDetails) => void;
  onRemove: (itemId: string) => void;
  formatPrice: (cents: number) => string;
  dataAosDelay?: number;
}

export interface CartItemsListProps {
  items: CartItemWithDetails[];
  notes: Record<string, string>;
  isLoading: boolean;
  onQuantityChange: (
    itemId: string,
    newQuantity: number,
    e?: React.MouseEvent
  ) => void;
  onNotesChange: (itemId: string, newNotes: string) => void;
  onOpenCustomization: (item: CartItemWithDetails) => void;
  onRemove: (itemId: string) => void;
  formatPrice: (cents: number) => string;
}

export interface CartHeroProps {
  title: string | ReactNode;
  subtitle: string;
}

export interface OrderSummaryProps {
  cart: {
    subtotal: number;
    tax: number;
    total: number;
    itemCount: number;
  };
  formatPrice: (cents: number) => string;
}

export interface PriceBreakdownProps {
  subtotal: number;
  tax: number;
  total: number;
  formatPrice: (cents: number) => string;
}

export interface CouponSectionProps {
  couponCode: string;
  onCouponCodeChange: (code: string) => void;
  onApplyCoupon: () => void;
  appliedCoupon?: {
    code: string;
    discount: number;
  };
  onRemoveCoupon: () => void;
  formatPrice: (cents: number) => string;
}

// Menu Component Types
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

export interface MenuFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  categories: Category[];
  onSearchChange: (query: string) => void;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

export interface MenuEmptyStateProps {
  searchQuery: string;
  selectedCategory: string;
  onClearFilters: () => void;
  className?: string;
}

export interface MenuCategorySliderProps {
  category: Category;
  sliderPosition: number;
  onGoToSlide: (direction: "prev" | "next") => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export interface MenuHeroProps {
  className?: string;
}

// Restaurant Component Types
export interface RestaurantFeaturedItemsProps {
  featuredItems: MenuItem[];
}

// Customer Reviews Types
export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

// Order Component Types
export interface OrderDetailsProps {
  order: {
    id: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    paymentMethod: string;
    total: number;
    createdAt: string;
    items: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
      image?: string;
    }>;
  };
  formatPrice: (cents: number) => string;
}

// Checkout Component Types
export interface CheckoutFormProps {
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
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error?: string;
}

// Payment Component Types
export interface PaymentFormProps {
  clientSecret: string;
  paymentStatus: "idle" | "processing" | "succeeded" | "failed";
  paymentError?: string;
  onRetryPayment: () => void;
}
