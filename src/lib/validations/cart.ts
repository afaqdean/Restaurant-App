import { z } from "zod";

// Cart item validation schema
export const cartItemSchema = z.object({
  itemId: z.string().min(1, "Item ID is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  notes: z.string().optional(),
  selectedOptions: z
    .array(
      z.object({
        optionId: z.string().min(1, "Option ID is required"),
        groupId: z.string().min(1, "Group ID is required"),
      })
    )
    .optional()
    .default([]),
});

// Add to cart validation
export const addToCartSchema = z.object({
  itemId: z.string().min(1, "Item ID is required"),
  quantity: z
    .number()
    .int()
    .min(1, "Quantity must be at least 1")
    .max(10, "Maximum quantity is 10"),
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
  selectedOptions: z
    .array(
      z.object({
        optionId: z.string().min(1, "Option ID is required"),
        groupId: z.string().min(1, "Group ID is required"),
      })
    )
    .optional()
    .default([]),
});

// Update cart item validation
export const updateCartItemSchema = z.object({
  itemId: z.string().min(1, "Item ID is required"),
  quantity: z
    .number()
    .int()
    .min(0, "Quantity cannot be negative")
    .max(10, "Maximum quantity is 10"),
  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
  selectedOptions: z
    .array(
      z.object({
        optionId: z.string().min(1, "Option ID is required"),
        groupId: z.string().min(1, "Group ID is required"),
      })
    )
    .optional()
    .default([]),
});

// Remove from cart validation
export const removeFromCartSchema = z.object({
  itemId: z.string().min(1, "Item ID is required"),
});

// Coupon validation
export const applyCouponSchema = z.object({
  code: z
    .string()
    .min(1, "Coupon code is required")
    .max(50, "Coupon code too long"),
});

// Checkout validation
export const checkoutSchema = z.object({
  customerName: z
    .string()
    .min(1, "Customer name is required")
    .max(100, "Name too long"),
  customerEmail: z.string().email("Invalid email address"),
  customerPhone: z
    .string()
    .min(1, "Phone number is required")
    .max(20, "Phone number too long"),
  paymentMethod: z.enum(["CARD", "COD"], {
    message: "Payment method must be CARD or COD",
  }),
  notes: z
    .string()
    .max(500, "Order notes cannot exceed 500 characters")
    .optional(),
  couponCode: z.string().optional(),
});

// Stripe payment intent validation
export const stripePaymentIntentSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
});

// COD payment confirmation validation
export const codPaymentConfirmationSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  confirmed: z.boolean(),
});

// Order status update validation
export const updateOrderStatusSchema = z.object({
  status: z.enum(
    ["PENDING", "ACCEPTED", "IN_KITCHEN", "READY", "COMPLETED", "CANCELLED"],
    {
      message: "Invalid order status",
    }
  ),
});

// Types
export type CartItem = z.infer<typeof cartItemSchema>;
export type AddToCartRequest = z.infer<typeof addToCartSchema>;
export type UpdateCartItemRequest = z.infer<typeof updateCartItemSchema>;
export type RemoveFromCartRequest = z.infer<typeof removeFromCartSchema>;
export type ApplyCouponRequest = z.infer<typeof applyCouponSchema>;
export type CheckoutRequest = z.infer<typeof checkoutSchema>;
export type StripePaymentIntentRequest = z.infer<
  typeof stripePaymentIntentSchema
>;
export type CodPaymentConfirmationRequest = z.infer<
  typeof codPaymentConfirmationSchema
>;
export type UpdateOrderStatusRequest = z.infer<typeof updateOrderStatusSchema>;
