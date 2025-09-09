import { prisma } from "@/lib/prisma";
import { CartItemWithDetails, CartSummary } from "@/types/cart";
import { CartItem } from "@/lib/validations/cart";

export class CartService {
  /**
   * Get or create cart order for user
   */
  private async getOrCreateCartOrder(userId?: string, sessionId?: string) {
    if (userId) {
      // Try to find existing cart order for authenticated user
      let cartOrder = await prisma.order.findFirst({
        where: {
          customerId: userId,
          status: "CART",
        },
        include: {
          items: {
            include: {
              item: {
                include: {
                  category: true,
                  optionGroups: {
                    include: {
                      options: true,
                    },
                  },
                },
              },
              options: {
                include: {
                  option: {
                    include: {
                      group: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!cartOrder) {
        // Create new cart order for user
        cartOrder = await prisma.order.create({
          data: {
            orderNumber: `CART-${Date.now()}-${Math.random()
              .toString(36)
              .substr(2, 9)}`,
            customerId: userId,
            customerName: "Cart User",
            customerEmail: "cart@temp.com",
            customerPhone: null,
            subtotal: 0,
            tax: 0,
            serviceFee: 0,
            discount: 0,
            total: 0,
            status: "CART",
            paymentMethod: "COD",
            paymentStatus: "UNPAID",
            notes: null,
          },
          include: {
            items: {
              include: {
                item: {
                  include: {
                    category: true,
                    optionGroups: {
                      include: {
                        options: true,
                      },
                    },
                  },
                },
                options: {
                  include: {
                    option: {
                      include: {
                        group: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
      }

      return cartOrder;
    } else if (sessionId) {
      // Try to find existing cart order for anonymous user
      let cartOrder = await prisma.order.findFirst({
        where: {
          customerEmail: `anonymous-${sessionId}@temp.com`,
          status: "CART",
        },
        include: {
          items: {
            include: {
              item: {
                include: {
                  category: true,
                  optionGroups: {
                    include: {
                      options: true,
                    },
                  },
                },
              },
              options: {
                include: {
                  option: {
                    include: {
                      group: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!cartOrder) {
        // Create new cart order for anonymous session
        cartOrder = await prisma.order.create({
          data: {
            orderNumber: `CART-${Date.now()}-${Math.random()
              .toString(36)
              .substr(2, 9)}`,
            customerId: null,
            customerName: "Anonymous",
            customerEmail: `anonymous-${sessionId}@temp.com`,
            customerPhone: null,
            subtotal: 0,
            tax: 0,
            serviceFee: 0,
            discount: 0,
            total: 0,
            status: "CART",
            paymentMethod: "COD",
            paymentStatus: "UNPAID",
            notes: null,
          },
          include: {
            items: {
              include: {
                item: {
                  include: {
                    category: true,
                    optionGroups: {
                      include: {
                        options: true,
                      },
                    },
                  },
                },
                options: {
                  include: {
                    option: {
                      include: {
                        group: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
      }

      return cartOrder;
    } else {
      throw new Error("Either userId or sessionId must be provided");
    }
  }

  /**
   * Get cart by user ID or session ID
   */
  async getCart(userId?: string, sessionId?: string) {
    return await this.getOrCreateCartOrder(userId, sessionId);
  }

  /**
   * Add item to cart
   */
  async addToCart(
    userId: string | undefined,
    sessionId: string | undefined,
    itemId: string,
    quantity: number,
    notes?: string,
    selectedOptions?: CartItem["selectedOptions"]
  ) {
    // Validate cart item
    await this.validateCartItem(itemId, quantity, selectedOptions);

    const cartOrder = await this.getOrCreateCartOrder(userId, sessionId);

    // Check if item already exists in cart
    const existingOrderItem = await prisma.orderItem.findFirst({
      where: {
        orderId: cartOrder.id,
        itemId: itemId,
      },
      include: {
        options: true,
      },
    });

    if (existingOrderItem) {
      // Check if options are the same
      const existingOptionIds = existingOrderItem.options
        .map((opt) => opt.optionId)
        .sort();
      const newOptionIds = (selectedOptions || [])
        .map((opt) => opt.optionId)
        .sort();

      if (JSON.stringify(existingOptionIds) === JSON.stringify(newOptionIds)) {
        // Same options - update quantity
        const newQuantity = Math.min(existingOrderItem.quantity + quantity, 10);
        await prisma.orderItem.update({
          where: { id: existingOrderItem.id },
          data: { quantity: newQuantity },
        });
      } else {
        // Different options - create new order item
        await this.createOrderItem(
          cartOrder.id,
          itemId,
          quantity,
          notes,
          selectedOptions
        );
      }
    } else {
      // New item - create order item
      await this.createOrderItem(
        cartOrder.id,
        itemId,
        quantity,
        notes,
        selectedOptions
      );
    }

    // Update cart order timestamp
    await prisma.order.update({
      where: { id: cartOrder.id },
      data: { updatedAt: new Date() },
    });

    return await this.getCart(userId, sessionId);
  }

  /**
   * Create order item with options
   */
  private async createOrderItem(
    orderId: string,
    itemId: string,
    quantity: number,
    notes?: string,
    selectedOptions?: CartItem["selectedOptions"]
  ) {
    // Get current item price
    const item = await prisma.item.findUnique({
      where: { id: itemId },
      select: { price: true },
    });

    if (!item) {
      throw new Error("Item not found");
    }

    const orderItem = await prisma.orderItem.create({
      data: {
        orderId,
        itemId,
        quantity,
        price: item.price, // Store current price
        notes,
      },
    });

    // Add selected options
    if (selectedOptions && selectedOptions.length > 0) {
      for (const option of selectedOptions) {
        const optionData = await prisma.itemOption.findUnique({
          where: { id: option.optionId },
          select: { price: true },
        });

        if (optionData) {
          await prisma.orderItemOption.create({
            data: {
              orderItemId: orderItem.id,
              optionId: option.optionId,
              price: optionData.price, // Store current option price
            },
          });
        }
      }
    }

    return orderItem;
  }

  /**
   * Update cart item
   */
  async updateCartItem(
    userId: string | undefined,
    sessionId: string | undefined,
    itemId: string,
    quantity: number,
    notes?: string,
    selectedOptions?: CartItem["selectedOptions"]
  ) {
    const cartOrder = await this.getOrCreateCartOrder(userId, sessionId);

    if (quantity === 0) {
      // Remove item from cart
      await this.removeFromCart(userId, sessionId, itemId);
      return await this.getCart(userId, sessionId);
    }

    // Validate cart item
    await this.validateCartItem(itemId, quantity, selectedOptions);

    // Find existing order item
    const existingOrderItem = await prisma.orderItem.findFirst({
      where: {
        orderId: cartOrder.id,
        itemId: itemId,
      },
    });

    if (!existingOrderItem) {
      throw new Error("Item not found in cart");
    }

    // Update order item
    await prisma.orderItem.update({
      where: { id: existingOrderItem.id },
      data: { quantity, notes },
    });

    // Update options
    await prisma.orderItemOption.deleteMany({
      where: { orderItemId: existingOrderItem.id },
    });

    if (selectedOptions && selectedOptions.length > 0) {
      for (const option of selectedOptions) {
        const optionData = await prisma.itemOption.findUnique({
          where: { id: option.optionId },
          select: { price: true },
        });

        if (optionData) {
          await prisma.orderItemOption.create({
            data: {
              orderItemId: existingOrderItem.id,
              optionId: option.optionId,
              price: optionData.price,
            },
          });
        }
      }
    }

    // Update cart order timestamp
    await prisma.order.update({
      where: { id: cartOrder.id },
      data: { updatedAt: new Date() },
    });

    return await this.getCart(userId, sessionId);
  }

  /**
   * Remove item from cart
   */
  async removeFromCart(
    userId: string | undefined,
    sessionId: string | undefined,
    itemId: string
  ) {
    const cartOrder = await this.getOrCreateCartOrder(userId, sessionId);

    await prisma.orderItem.deleteMany({
      where: {
        orderId: cartOrder.id,
        itemId: itemId,
      },
    });

    // Update cart order timestamp
    await prisma.order.update({
      where: { id: cartOrder.id },
      data: { updatedAt: new Date() },
    });

    return await this.getCart(userId, sessionId);
  }

  /**
   * Clear cart
   */
  async clearCart(userId: string | undefined, sessionId: string | undefined) {
    const cartOrder = await this.getOrCreateCartOrder(userId, sessionId);

    await prisma.orderItem.deleteMany({
      where: { orderId: cartOrder.id },
    });

    await prisma.order.update({
      where: { id: cartOrder.id },
      data: {
        subtotal: 0,
        tax: 0,
        serviceFee: 0,
        discount: 0,
        total: 0,
        updatedAt: new Date(),
      },
    });

    return await this.getCart(userId, sessionId);
  }

  /**
   * Apply coupon to cart
   */
  async applyCoupon(
    userId: string | undefined,
    sessionId: string | undefined,
    couponCode: string
  ) {
    const cartOrder = await this.getOrCreateCartOrder(userId, sessionId);

    // Calculate current subtotal
    const cartSummary = await this.calculateCartSummary(cartOrder);

    // Validate coupon
    const couponResult = await this.validateAndCalculateCouponDiscount(
      couponCode,
      cartSummary.subtotal
    );

    if (!couponResult.valid) {
      throw new Error(couponResult.error || "Invalid coupon");
    }

    // Apply coupon to cart order (store in notes for now)
    await prisma.order.update({
      where: { id: cartOrder.id },
      data: {
        notes: `COUPON:${couponCode}`,
        updatedAt: new Date(),
      },
    });

    return await this.getCart(userId, sessionId);
  }

  /**
   * Remove coupon from cart
   */
  async removeCoupon(
    userId: string | undefined,
    sessionId: string | undefined
  ) {
    const cartOrder = await this.getOrCreateCartOrder(userId, sessionId);

    await prisma.order.update({
      where: { id: cartOrder.id },
      data: {
        notes: null,
        updatedAt: new Date(),
      },
    });

    return await this.getCart(userId, sessionId);
  }

  /**
   * Clean up old abandoned cart orders
   */
  async cleanupAbandonedCarts() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Delete cart orders older than 7 days
    const deletedCarts = await prisma.order.deleteMany({
      where: {
        status: "CART",
        createdAt: {
          lt: sevenDaysAgo,
        },
      },
    });

    console.log(`Cleaned up ${deletedCarts.count} abandoned cart orders`);

    return {
      cartOrdersDeleted: deletedCarts.count,
    };
  }

  /**
   * Merge anonymous cart with user cart when user logs in
   */
  async mergeAnonymousCartWithUserCart(userId: string, sessionId: string) {
    const userCart = await this.getOrCreateCartOrder(userId, undefined);
    const anonymousCart = await this.getOrCreateCartOrder(undefined, sessionId);

    // If anonymous cart has items, merge them
    if (anonymousCart.items.length > 0) {
      for (const anonymousItem of anonymousCart.items) {
        // Check if user cart already has this item with same options
        const existingUserItem = await prisma.orderItem.findFirst({
          where: {
            orderId: userCart.id,
            itemId: anonymousItem.itemId,
          },
          include: {
            options: true,
          },
        });

        if (existingUserItem) {
          // Check if options are the same
          const existingOptionIds = existingUserItem.options
            .map((opt) => opt.optionId)
            .sort();
          const anonymousOptionIds = anonymousItem.options
            .map((opt) => opt.optionId)
            .sort();

          if (
            JSON.stringify(existingOptionIds) ===
            JSON.stringify(anonymousOptionIds)
          ) {
            // Same options - merge quantities
            const newQuantity = Math.min(
              existingUserItem.quantity + anonymousItem.quantity,
              10
            );
            await prisma.orderItem.update({
              where: { id: existingUserItem.id },
              data: { quantity: newQuantity },
            });
          } else {
            // Different options - copy anonymous item to user cart
            await this.addToCart(
              userId,
              undefined,
              anonymousItem.itemId,
              anonymousItem.quantity,
              anonymousItem.notes || undefined,
              anonymousItem.options.map((opt) => ({
                optionId: opt.optionId,
                groupId: opt.option.groupId,
              }))
            );
          }
        } else {
          // Copy anonymous item to user cart
          await this.addToCart(
            userId,
            undefined,
            anonymousItem.itemId,
            anonymousItem.quantity,
            anonymousItem.notes || undefined,
            anonymousItem.options.map((opt) => ({
              optionId: opt.optionId,
              groupId: opt.option.groupId,
            }))
          );
        }
      }

      // Apply anonymous cart's coupon if user cart doesn't have one
      if (anonymousCart.notes && !userCart.notes) {
        await prisma.order.update({
          where: { id: userCart.id },
          data: { notes: anonymousCart.notes },
        });
      }

      // Clear anonymous cart items
      await prisma.orderItem.deleteMany({
        where: { orderId: anonymousCart.id },
      });
    }

    return await this.getCart(userId, undefined);
  }
  /**
   * Calculate item price including selected options
   */
  private async calculateItemPrice(
    itemId: string,
    selectedOptions: CartItem["selectedOptions"]
  ): Promise<number> {
    const item = await prisma.item.findUnique({
      where: { id: itemId },
      select: { price: true },
    });

    if (!item) {
      throw new Error("Item not found");
    }

    let totalPrice = item.price;

    if (selectedOptions && selectedOptions.length > 0) {
      const optionIds = selectedOptions.map((opt) => opt.optionId);
      const options = await prisma.itemOption.findMany({
        where: { id: { in: optionIds } },
        select: { price: true },
      });

      const optionPrices = options.reduce(
        (sum, option) => sum + option.price,
        0
      );
      totalPrice += optionPrices;
    }

    return totalPrice;
  }

  /**
   * Validate cart item options
   */
  private async validateCartItemOptions(
    itemId: string,
    selectedOptions: CartItem["selectedOptions"]
  ): Promise<void> {
    if (!selectedOptions || selectedOptions.length === 0) {
      return;
    }

    const item = await prisma.item.findUnique({
      where: { id: itemId },
      include: {
        optionGroups: {
          include: { options: true },
        },
      },
    });

    if (!item) {
      throw new Error("Item not found");
    }

    // Check if all required option groups are selected
    const requiredGroups = item.optionGroups.filter((group) => group.required);
    const selectedGroupIds = new Set(selectedOptions.map((opt) => opt.groupId));

    for (const group of requiredGroups) {
      if (!selectedGroupIds.has(group.id)) {
        throw new Error(
          `Required option group "${group.name}" is not selected`
        );
      }
    }

    // Validate option IDs exist and belong to correct groups
    for (const selectedOption of selectedOptions) {
      const option = await prisma.itemOption.findUnique({
        where: { id: selectedOption.optionId },
        include: { group: true },
      });

      if (!option) {
        throw new Error(`Option with ID ${selectedOption.optionId} not found`);
      }

      if (option.groupId !== selectedOption.groupId) {
        throw new Error(
          `Option ${option.name} does not belong to the specified group`
        );
      }
    }

    // Check for multiple selections in single-selection groups
    const groupSelections = new Map<string, string[]>();
    for (const selectedOption of selectedOptions) {
      const groupId = selectedOption.groupId;
      if (!groupSelections.has(groupId)) {
        groupSelections.set(groupId, []);
      }
      groupSelections.get(groupId)!.push(selectedOption.optionId);
    }

    for (const [groupId, optionIds] of Array.from(groupSelections.entries())) {
      const group = item.optionGroups.find((g) => g.id === groupId);
      if (group && !group.multiple && optionIds.length > 1) {
        throw new Error(
          `Option group "${group.name}" only allows single selection`
        );
      }
    }
  }

  /**
   * Get cart item with full details
   */
  async getCartItemWithDetails(
    cartItem: CartItem
  ): Promise<CartItemWithDetails> {
    const item = await prisma.item.findUnique({
      where: { id: cartItem.itemId },
      include: {
        category: {
          select: { id: true, name: true },
        },
        optionGroups: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!item) {
      throw new Error("Item not found");
    }

    // Get selected options with details
    const selectedOptionsWithDetails = [];
    if (cartItem.selectedOptions && cartItem.selectedOptions.length > 0) {
      const optionIds = cartItem.selectedOptions.map((opt) => opt.optionId);
      const options = await prisma.itemOption.findMany({
        where: { id: { in: optionIds } },
        include: {
          group: {
            select: { id: true, name: true, required: true, multiple: true },
          },
        },
      });

      for (const selectedOption of cartItem.selectedOptions) {
        const option = options.find(
          (opt) => opt.id === selectedOption.optionId
        );
        if (option) {
          selectedOptionsWithDetails.push({
            optionId: selectedOption.optionId,
            groupId: selectedOption.groupId,
            option: {
              id: option.id,
              name: option.name,
              price: option.price,
              group: option.group,
            },
          });
        }
      }
    }

    const calculatedPrice = await this.calculateItemPrice(
      cartItem.itemId,
      cartItem.selectedOptions
    );
    const totalPrice = calculatedPrice * cartItem.quantity;

    return {
      ...cartItem,
      item: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        category: item.category,
        optionGroups: item.optionGroups.map((group) => ({
          id: group.id,
          name: group.name,
          required: group.required,
          multiple: group.multiple,
          itemId: group.itemId,
          options: group.options.map((option) => ({
            id: option.id,
            name: option.name,
            price: option.price,
            formattedPrice: `$${(option.price / 100).toFixed(2)}`,
            groupId: option.groupId,
          })),
        })),
      },
      selectedOptions: selectedOptionsWithDetails,
      calculatedPrice,
      totalPrice,
    };
  }

  /**
   * Calculate cart summary from cart order
   */
  async calculateCartSummary(cartOrder: {
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
  }): Promise<CartSummary> {
    const items: CartItemWithDetails[] = [];
    let subtotal = 0;

    // Process each order item
    for (const orderItem of cartOrder.items) {
      const itemWithDetails = await this.getCartItemWithDetailsFromDB(
        orderItem
      );
      items.push(itemWithDetails);
      subtotal += itemWithDetails.totalPrice;
    }

    // Get tax and service fee rates from settings
    const taxRate = await this.getTaxRate();
    const serviceFeeRate = await this.getServiceFeeRate();

    const tax = Math.round(subtotal * taxRate);
    const serviceFee = Math.round(subtotal * serviceFeeRate);

    // Calculate discount if coupon is applied
    let discount = 0;
    let appliedCoupon;
    if (cartOrder.notes?.startsWith("COUPON:")) {
      const couponCode = cartOrder.notes.replace("COUPON:", "");
      const couponResult = await this.validateAndCalculateCouponDiscount(
        couponCode,
        subtotal
      );
      if (couponResult.valid && couponResult.discount !== undefined) {
        discount = couponResult.discount;
        appliedCoupon = {
          id: couponResult.id!,
          code: couponResult.code!,
          type: couponResult.type!,
          value: couponResult.value!,
          discount: couponResult.discount,
        };
      }
    }

    const total = subtotal + tax + serviceFee - discount;
    const itemCount = cartOrder.items.reduce(
      (sum: number, item: { quantity: number }) => sum + item.quantity,
      0
    );

    return {
      items,
      subtotal,
      tax,
      serviceFee,
      discount,
      total,
      itemCount,
      appliedCoupon,
    };
  }

  /**
   * Get cart item with full details from database cart item
   */
  private async getCartItemWithDetailsFromDB(cartItem: {
    itemId: string;
    quantity: number;
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
        options: { id: string; name: string; price: number; groupId: string }[];
      }[];
    };
  }): Promise<CartItemWithDetails> {
    const item = cartItem.item;

    // Get selected options with details
    const selectedOptionsWithDetails = [];
    if (cartItem.options && cartItem.options.length > 0) {
      for (const cartOption of cartItem.options) {
        const option = cartOption.option as {
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
        selectedOptionsWithDetails.push({
          optionId: option.id,
          groupId: option.groupId,
          option: {
            id: option.id,
            name: option.name,
            price: option.price,
            group: {
              id: option.group.id,
              name: option.group.name,
              required: option.group.required,
              multiple: option.group.multiple,
            },
          },
        });
      }
    }

    // Calculate price
    let calculatedPrice = item.price || 0;
    if (cartItem.options && cartItem.options.length > 0) {
      const optionPrices = cartItem.options.reduce(
        (sum: number, cartOption: { option: { price: number } }) =>
          sum + cartOption.option.price,
        0
      );
      calculatedPrice += optionPrices;
    }

    const totalPrice = calculatedPrice * cartItem.quantity;

    return {
      itemId: cartItem.itemId,
      quantity: cartItem.quantity,
      notes: cartItem.notes || undefined,
      selectedOptions: selectedOptionsWithDetails,
      item: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        category: {
          id: item.category.id,
          name: item.category.name,
        },
        optionGroups: item.optionGroups.map(
          (group: {
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
          }) => ({
            id: group.id,
            name: group.name,
            required: group.required,
            multiple: group.multiple,
            itemId: group.itemId,
            options: group.options.map(
              (option: {
                id: string;
                name: string;
                price: number;
                groupId: string;
              }) => ({
                id: option.id,
                name: option.name,
                price: option.price,
                formattedPrice: `$${(option.price / 100).toFixed(2)}`,
                groupId: option.groupId,
              })
            ),
          })
        ),
      },
      calculatedPrice,
      totalPrice,
    };
  }

  /**
   * Get tax rate from settings
   */
  private async getTaxRate(): Promise<number> {
    const setting = await prisma.settings.findUnique({
      where: { key: "tax_rate" },
    });
    return setting ? parseFloat(setting.value) : 0.085; // Default 8.5%
  }

  /**
   * Get service fee rate from settings
   */
  private async getServiceFeeRate(): Promise<number> {
    const setting = await prisma.settings.findUnique({
      where: { key: "service_fee_rate" },
    });
    return setting ? parseFloat(setting.value) : 0.03; // Default 3%
  }

  /**
   * Public getter for tax rate
   */
  async getTaxRatePublic(): Promise<number> {
    return this.getTaxRate();
  }

  /**
   * Public getter for service fee rate
   */
  async getServiceFeeRatePublic(): Promise<number> {
    return this.getServiceFeeRate();
  }

  /**
   * Validate and calculate coupon discount
   */
  async validateAndCalculateCouponDiscount(
    couponCode: string,
    subtotal: number
  ): Promise<{
    valid: boolean;
    id?: string;
    code?: string;
    type?: "FIXED" | "PERCENTAGE";
    value?: number;
    discount?: number;
    error?: string;
  }> {
    try {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode },
      });

      if (!coupon) {
        return { valid: false, error: "Coupon not found" };
      }

      if (!coupon.active) {
        return { valid: false, error: "Coupon is not active" };
      }

      if (coupon.expiresAt && coupon.expiresAt < new Date()) {
        return { valid: false, error: "Coupon has expired" };
      }

      if (coupon.minAmount && subtotal < coupon.minAmount) {
        return {
          valid: false,
          error: `Minimum order amount of $${(coupon.minAmount / 100).toFixed(
            2
          )} required`,
        };
      }

      if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
        return { valid: false, error: "Coupon usage limit exceeded" };
      }

      let discount = 0;
      if (coupon.type === "FIXED") {
        discount = Math.min(coupon.value, subtotal);
      } else if (coupon.type === "PERCENTAGE") {
        discount = Math.round(subtotal * (coupon.value / 100));
      }

      return {
        valid: true,
        id: coupon.id,
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discount,
      };
    } catch {
      return { valid: false, error: "Failed to validate coupon" };
    }
  }

  /**
   * Validate cart item before adding/updating
   */
  async validateCartItem(
    itemId: string,
    quantity: number,
    selectedOptions?: CartItem["selectedOptions"]
  ): Promise<void> {
    // Check if item exists and is active
    const item = await prisma.item.findUnique({
      where: { id: itemId },
      select: { active: true },
    });

    if (!item) {
      throw new Error("Item not found");
    }

    if (!item.active) {
      throw new Error("Item is not available");
    }

    // Validate options
    if (selectedOptions) {
      await this.validateCartItemOptions(itemId, selectedOptions);
    }
  }
}
