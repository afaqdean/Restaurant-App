// Payment methods
export const PAYMENT_METHODS = {
  CARD: "CARD",
  COD: "COD",
} as const;

// Order statuses
export const ORDER_STATUS = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  IN_KITCHEN: "IN_KITCHEN",
  READY: "READY",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

// Payment statuses
export const PAYMENT_STATUS = {
  PAID: "PAID",
  UNPAID: "UNPAID",
  REFUNDED: "REFUNDED",
} as const;

// Payment form statuses
export const PAYMENT_FORM_STATUS = {
  PROCESSING: "processing",
  SUCCESS: "success",
  FAILED: "failed",
} as const;

// Cart limits
export const CART_LIMITS = {
  MAX_QUANTITY_PER_ITEM: 10,
  MAX_ITEMS_IN_CART: 50,
} as const;

// Price formatting
export const PRICE_FORMAT = {
  CURRENCY: "USD",
  LOCALE: "en-US",
} as const;

// API endpoints
export const API_ENDPOINTS = {
  CART: "/api/cart",
  CHECKOUT: "/api/checkout",
  ORDERS: "/api/orders",
  MENU: "/api/menu",
  PAYMENTS: "/api/payments",
  AUTH: {
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
    CALLBACK: "/auth/callback",
  },
} as const;

// Routes
export const ROUTES = {
  HOME: "/",
  MENU: "/menu",
  CART: "/cart",
  CHECKOUT: "/checkout",
  PAYMENT: "/payment",
  ORDERS: "/orders",
  ORDER_DETAIL: "/order",
  ADMIN: "/admin",
  AUTH: {
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
  },
} as const;

// Form validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 255,
  MAX_PHONE_LENGTH: 20,
  MAX_NOTES_LENGTH: 500,
} as const;

// UI constants
export const UI = {
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
  TOAST_DURATION: 5000,
  MODAL_ANIMATION_DURATION: 200,
} as const;

// Date formats
export const DATE_FORMATS = {
  DISPLAY: "MMM dd, yyyy",
  TIME: "h:mm a",
  DATETIME: "MMM dd, yyyy h:mm a",
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
} as const;

// File upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp"],
  ALLOWED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".webp"],
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

// Search
export const SEARCH = {
  MIN_QUERY_LENGTH: 2,
  MAX_QUERY_LENGTH: 100,
  DEBOUNCE_DELAY: 300,
} as const;

// Coupon types
export const COUPON_TYPES = {
  FIXED: "FIXED",
  PERCENTAGE: "PERCENTAGE",
} as const;

// Tax and fees
export const TAX_RATE = 0.08; // 8%
export const SERVICE_FEE_RATE = 0.03; // 3%

// Order status colors (for UI)
export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: "bg-yellow-100 text-yellow-800 border-yellow-200",
  [ORDER_STATUS.ACCEPTED]: "bg-blue-100 text-blue-800 border-blue-200",
  [ORDER_STATUS.IN_KITCHEN]: "bg-orange-100 text-orange-800 border-orange-200",
  [ORDER_STATUS.READY]: "bg-emerald-100 text-emerald-800 border-emerald-200",
  [ORDER_STATUS.COMPLETED]:
    "bg-emerald-100 text-emerald-800 border-emerald-200",
  [ORDER_STATUS.CANCELLED]: "bg-red-100 text-red-800 border-red-200",
} as const;

// Payment status colors (for UI)
export const PAYMENT_STATUS_COLORS = {
  [PAYMENT_STATUS.PAID]: "bg-emerald-100 text-emerald-800 border-emerald-200",
  [PAYMENT_STATUS.UNPAID]: "bg-yellow-100 text-yellow-800 border-yellow-200",
  [PAYMENT_STATUS.REFUNDED]: "bg-red-100 text-red-800 border-red-200",
} as const;

// Export customer constants
export * from "./customer";

// Export auth constants
export * from "./auth";
