// Customer Reviews Constants
export const SAMPLE_REVIEWS = [
  {
    id: "1",
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Absolutely amazing food! The steak was cooked to perfection and the service was outstanding. Will definitely be coming back!",
    date: "2024-01-15",
    avatar: "SJ", // Using initials instead of external image
  },
  {
    id: "2",
    name: "Michael Chen",
    rating: 5,
    comment:
      "Best restaurant in town! The pasta was incredible and the atmosphere was perfect for a romantic dinner.",
    date: "2024-01-12",
    avatar: "MC", // Using initials instead of external image
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    rating: 4,
    comment:
      "Great food and friendly staff. The portions were generous and everything tasted fresh. Highly recommend!",
    date: "2024-01-10",
    avatar: "ER", // Using initials instead of external image
  },
  {
    id: "4",
    name: "David Thompson",
    rating: 5,
    comment:
      "Exceptional dining experience! The chef's special was outstanding and the wine selection was perfect.",
    date: "2024-01-08",
    avatar: "DT", // Using initials instead of external image
  },
  {
    id: "5",
    name: "Lisa Wang",
    rating: 4,
    comment:
      "Delicious food and beautiful presentation. The dessert was the perfect ending to a wonderful meal.",
    date: "2024-01-05",
    avatar: "LW", // Using initials instead of external image
  },
] as const;

// Button Constants
export const BUTTON_SIZES = {
  SM: "sm",
  MD: "md",
  LG: "lg",
} as const;

export const BUTTON_VARIANTS = {
  PRIMARY: {
    GRADIENT: "gradient",
    SOLID: "solid",
  },
  SECONDARY: {
    OUTLINE: "outline",
    GHOST: "ghost",
    GRAY: "gray",
  },
  CART_ACTION: {
    TEXT: "text",
    ICON_TEXT: "icon-text",
    DESTRUCTIVE: "destructive",
  },
  NAVIGATION: {
    CAROUSEL: "carousel",
    DOTS: "dots",
  },
  FILTER: {
    CATEGORY: "category",
    TOGGLE: "toggle",
  },
} as const;

export const ICON_POSITIONS = {
  LEFT: "left",
  RIGHT: "right",
} as const;

export const CART_ACTIONS = {
  ADD: "add",
  REMOVE: "remove",
  EDIT: "edit",
  CUSTOM: "custom",
} as const;

export const NAVIGATION_DIRECTIONS = {
  PREV: "prev",
  NEXT: "next",
} as const;

export const QUANTITY_BUTTON_TYPES = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
} as const;

// Order Status Constants
export const ORDER_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PREPARING: "PREPARING",
  READY: "READY",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

// Payment Status Constants
export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
} as const;

// Payment Method Constants
export const PAYMENT_METHOD = {
  CARD: "CARD",
  CASH: "CASH",
  ONLINE: "ONLINE",
} as const;

// Default Values
export const DEFAULT_VALUES = {
  BUTTON_LOADING_TEXT: "Loading...",
  QUANTITY_MIN: 1,
  QUANTITY_MAX: 10,
  CART_EMPTY_MESSAGE: "Your cart is empty",
  NO_ITEMS_MESSAGE: "No items found",
  ERROR_MESSAGE: "Something went wrong",
} as const;

// Animation Constants
export const ANIMATION_DELAYS = {
  FAST: 100,
  MEDIUM: 200,
  SLOW: 300,
  VERY_SLOW: 400,
} as const;
