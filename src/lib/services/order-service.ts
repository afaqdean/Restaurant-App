import { prisma } from "@/lib/prisma";
import { OrderCalculation, OrderCreationResult } from "@/types/cart";
import { OrderStatus } from "@/types/order";
import { SessionCart } from "@/types/cart";
import { CartService } from "./cart-service";
import { CheckoutRequest } from "@/lib/validations/cart";
import { AuditService } from "./audit-service";

export class OrderService {
  private cartService: CartService;
  private auditService: AuditService;

  constructor() {
    this.cartService = new CartService();
    this.auditService = new AuditService();
  }

  /**
   * Generate unique order number
   */
  private async generateOrderNumber(): Promise<string> {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");

    // Get count of orders today
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const orderCount = await prisma.order.count({
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });

    const sequence = (orderCount + 1).toString().padStart(3, "0");
    return `ORD-${dateStr}-${sequence}`;
  }

  /**
   * Calculate order totals
   */
  async calculateOrderTotals(
    sessionCart: SessionCart
  ): Promise<OrderCalculation> {
    // Calculate subtotal from session cart items
    let subtotal = 0;
    for (const cartItem of Object.values(sessionCart.items)) {
      // Get item price from database
      const item = await prisma.item.findUnique({
        where: { id: cartItem.itemId },
        select: { price: true },
      });

      if (item) {
        let itemPrice = item.price;

        // Add option prices if any
        if (cartItem.selectedOptions && cartItem.selectedOptions.length > 0) {
          const optionIds = cartItem.selectedOptions.map((opt) => opt.optionId);
          const options = await prisma.itemOption.findMany({
            where: { id: { in: optionIds } },
            select: { price: true },
          });

          const optionPrices = options.reduce(
            (sum, option) => sum + option.price,
            0
          );
          itemPrice += optionPrices;
        }

        subtotal += itemPrice * cartItem.quantity;
      }
    }

    // Get tax and service fee rates
    const taxRate = await this.cartService.getTaxRatePublic();
    const serviceFeeRate = await this.cartService.getServiceFeeRatePublic();

    const tax = Math.round(subtotal * taxRate);
    const serviceFee = Math.round(subtotal * serviceFeeRate);

    // Calculate discount if coupon is applied
    let discount = 0;
    let appliedCoupon;
    if (sessionCart.couponCode) {
      const couponResult =
        await this.cartService.validateAndCalculateCouponDiscount(
          sessionCart.couponCode,
          subtotal
        );
      if (couponResult.valid && couponResult.discount !== undefined) {
        discount = couponResult.discount;
        appliedCoupon = {
          id: "", // Will be filled when creating order
          code: couponResult.code!,
          type: couponResult.type!,
          value: couponResult.value!,
          discount: couponResult.discount,
        };
      }
    }

    const total = subtotal + tax + serviceFee - discount;

    return {
      subtotal,
      tax,
      serviceFee,
      discount,
      total,
      appliedCoupon,
    };
  }

  /**
   * Create order from database cart
   */
  async createOrderFromCart(
    cartOrder: {
      id: string;
      items: {
        quantity: number;
        itemId: string;
        notes?: string | null;
        options?: {
          option: {
            price: number;
            id: string;
            name: string;
            groupId: string;
            group: {
              id: string;
              name: string;
              required: boolean;
              multiple: boolean;
            };
          };
        }[];
        item: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          image: string | null;
          category: { id: string; name: string };
          optionGroups: {
            id: string;
            name: string;
            required: boolean;
            multiple: boolean;
            itemId: string;
            options: {
              id: string;
              name: string;
              price: number;
              groupId: string;
            }[];
          }[];
        };
      }[];
      notes?: string | null;
    },
    cartSummary: {
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
    },
    checkoutData: CheckoutRequest,
    customerId?: string
  ): Promise<OrderCreationResult> {
    try {
      // Validate cart is not empty
      if (!cartOrder.items || cartOrder.items.length === 0) {
        return {
          success: false,
          error: "Cart is empty",
        };
      }

      // Generate order number
      const orderNumber = await this.generateOrderNumber();

      // Create order
      const order = await prisma.order.create({
        data: {
          orderNumber,
          customerId,
          customerName: checkoutData.customerName,
          customerEmail: checkoutData.customerEmail,
          customerPhone: checkoutData.customerPhone,
          subtotal: cartSummary.subtotal,
          tax: cartSummary.tax,
          serviceFee: cartSummary.serviceFee,
          discount: cartSummary.discount,
          total: cartSummary.total,
          status: "PENDING",
          paymentMethod: checkoutData.paymentMethod,
          paymentStatus:
            checkoutData.paymentMethod === "COD" ? "UNPAID" : "UNPAID",
          notes: checkoutData.notes,
        },
      });

      // Create order items from cart items
      for (const cartItem of cartOrder.items) {
        const orderItem = await prisma.orderItem.create({
          data: {
            orderId: order.id,
            itemId: cartItem.itemId,
            quantity: cartItem.quantity,
            price: cartItem.item.price, // Use the price from the item
            notes: cartItem.notes,
          },
        });

        // Create order item options
        if (cartItem.options && cartItem.options.length > 0) {
          for (const cartOption of cartItem.options) {
            await prisma.orderItemOption.create({
              data: {
                orderItemId: orderItem.id,
                optionId: cartOption.option.id,
                price: cartOption.option.price, // Use the price from the option
              },
            });
          }
        }
      }

      // Apply coupon if exists
      if (cartSummary.appliedCoupon) {
        const coupon = await prisma.coupon.findUnique({
          where: { code: cartSummary.appliedCoupon.code },
        });

        if (coupon) {
          await prisma.orderCoupon.create({
            data: {
              orderId: order.id,
              couponId: coupon.id,
              discount: cartSummary.appliedCoupon.discount,
            },
          });

          // Update coupon usage count
          await prisma.coupon.update({
            where: { id: coupon.id },
            data: { currentUses: coupon.currentUses + 1 },
          });
        }
      }

      // Create audit log
      await prisma.auditLog.create({
        data: {
          orderId: order.id,
          action: "ORDER_CREATED",
          newValue: JSON.stringify({
            orderNumber: order.orderNumber,
            total: order.total,
            paymentMethod: order.paymentMethod,
          }),
          userId: customerId,
        },
      });

      return {
        success: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
      };
    } catch (error) {
      console.error("Create order from cart error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create order",
      };
    }
  }

  /**
   * Create order from session cart (legacy method)
   */
  async createOrder(
    sessionCart: SessionCart,
    checkoutData: CheckoutRequest,
    customerId?: string
  ): Promise<OrderCreationResult> {
    try {
      // Validate cart is not empty
      if (Object.keys(sessionCart.items).length === 0) {
        return {
          success: false,
          error: "Cart is empty",
        };
      }

      // Calculate order totals
      const orderCalculation = await this.calculateOrderTotals(sessionCart);

      // Generate order number
      const orderNumber = await this.generateOrderNumber();

      // Create order
      const order = await prisma.order.create({
        data: {
          orderNumber,
          customerId,
          customerName: checkoutData.customerName,
          customerEmail: checkoutData.customerEmail,
          customerPhone: checkoutData.customerPhone,
          subtotal: orderCalculation.subtotal,
          tax: orderCalculation.tax,
          serviceFee: orderCalculation.serviceFee,
          discount: orderCalculation.discount,
          total: orderCalculation.total,
          status: "PENDING",
          paymentMethod: checkoutData.paymentMethod,
          paymentStatus:
            checkoutData.paymentMethod === "COD" ? "UNPAID" : "UNPAID",
          notes: checkoutData.notes,
        },
      });

      // Create order items
      for (const cartItem of Object.values(sessionCart.items)) {
        const item = await prisma.item.findUnique({
          where: { id: cartItem.itemId },
          select: { price: true },
        });

        if (!item) {
          throw new Error(`Item ${cartItem.itemId} not found`);
        }

        const orderItem = await prisma.orderItem.create({
          data: {
            orderId: order.id,
            itemId: cartItem.itemId,
            quantity: cartItem.quantity,
            price: item.price,
            notes: cartItem.notes,
          },
        });

        // Create order item options
        if (cartItem.selectedOptions && cartItem.selectedOptions.length > 0) {
          for (const selectedOption of cartItem.selectedOptions) {
            const option = await prisma.itemOption.findUnique({
              where: { id: selectedOption.optionId },
              select: { price: true },
            });

            if (option) {
              await prisma.orderItemOption.create({
                data: {
                  orderItemId: orderItem.id,
                  optionId: selectedOption.optionId,
                  price: option.price,
                },
              });
            }
          }
        }
      }

      // Apply coupon if exists
      if (sessionCart.couponCode && orderCalculation.appliedCoupon) {
        const coupon = await prisma.coupon.findUnique({
          where: { code: sessionCart.couponCode },
        });

        if (coupon) {
          await prisma.orderCoupon.create({
            data: {
              orderId: order.id,
              couponId: coupon.id,
              discount: orderCalculation.appliedCoupon.discount,
            },
          });

          // Update coupon usage count
          await prisma.coupon.update({
            where: { id: coupon.id },
            data: { currentUses: coupon.currentUses + 1 },
          });
        }
      }

      // Create audit log
      await prisma.auditLog.create({
        data: {
          orderId: order.id,
          action: "ORDER_CREATED",
          newValue: JSON.stringify({
            orderNumber: order.orderNumber,
            total: order.total,
            paymentMethod: order.paymentMethod,
          }),
          userId: customerId,
        },
      });

      return {
        success: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
      };
    } catch (error) {
      console.error("Create order error:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to create order",
      };
    }
  }

  /**
   * Update order status
   */
  async updateOrderStatus(
    orderId: string,
    status:
      | "PENDING"
      | "ACCEPTED"
      | "IN_KITCHEN"
      | "READY"
      | "COMPLETED"
      | "CANCELLED",
    userId?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        select: { status: true, orderNumber: true },
      });

      if (!order) {
        return { success: false, error: "Order not found" };
      }

      const oldStatus = order.status;

      await prisma.order.update({
        where: { id: orderId },
        data: { status },
      });

      // Create audit log
      await this.auditService.logOrderStatusChange(
        orderId,
        oldStatus,
        status,
        userId
      );

      return { success: true };
    } catch (error) {
      console.error("Update order status error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to update order status",
      };
    }
  }

  /**
   * Get order by ID with full details
   */
  async getOrderById(orderId: string, includeDetails: boolean = false) {
    return await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: {
          select: { id: true, name: true, email: true, phone: true },
        },
        items: {
          include: {
            item: {
              select: {
                id: true,
                name: true,
                description: true,
                price: true,
                image: true,
              },
            },
            options: {
              include: {
                option: {
                  select: { id: true, name: true, price: true },
                },
              },
            },
          },
        },
        payments: includeDetails ? true : false,
        coupons: includeDetails
          ? {
              include: {
                coupon: {
                  select: { id: true, code: true, type: true, value: true },
                },
              },
            }
          : false,
        auditLogs: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });
  }

  /**
   * Get orders for customer
   */
  async getCustomerOrders(customerId: string, limit = 20, offset = 0) {
    return await prisma.order.findMany({
      where: { customerId },
      include: {
        items: {
          include: {
            item: {
              select: { id: true, name: true, price: true, image: true },
            },
          },
        },
        payments: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });
  }

  /**
   * Get all orders (admin)
   */
  async getAllOrders(limit = 50, offset = 0, status?: OrderStatus | "CART") {
    const where = status ? { status } : {};

    return await prisma.order.findMany({
      where,
      include: {
        customer: {
          select: { id: true, name: true, email: true },
        },
        items: {
          include: {
            item: {
              select: { id: true, name: true, price: true },
            },
          },
        },
        payments: true,
      },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });
  }
}
