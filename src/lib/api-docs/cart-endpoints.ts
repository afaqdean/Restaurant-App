export const cartEndpoints = {
  "/api/cart": {
    get: {
      summary: "Get cart contents",
      description: "Retrieve the current user's cart",
      tags: ["Cart"],
      responses: {
        "200": {
          description: "Cart retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  cart: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      items: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            itemId: { type: "string" },
                            quantity: { type: "number" },
                            price: { type: "number" },
                            notes: { type: "string" },
                            item: { $ref: "#/components/schemas/MenuItem" },
                            options: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  id: { type: "string" },
                                  optionId: { type: "string" },
                                  price: { type: "number" },
                                  option: {
                                    $ref: "#/components/schemas/ItemOption",
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                      subtotal: { type: "number" },
                      tax: { type: "number" },
                      serviceFee: { type: "number" },
                      discount: { type: "number" },
                      total: { type: "number" },
                    },
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
    post: {
      summary: "Add item to cart",
      description: "Add a menu item to the cart",
      tags: ["Cart"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                itemId: {
                  type: "string",
                  description: "Menu item ID",
                },
                quantity: {
                  type: "number",
                  minimum: 1,
                  maximum: 10,
                  description: "Quantity to add",
                },
                notes: {
                  type: "string",
                  maxLength: 500,
                  description: "Special notes for the item",
                },
                selectedOptions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      optionId: { type: "string" },
                      groupId: { type: "string" },
                    },
                  },
                  description: "Selected options for the item",
                },
              },
            },
            example: {
              itemId: "item_123",
              quantity: 2,
              notes: "Extra spicy",
              selectedOptions: [
                {
                  optionId: "opt_123",
                  groupId: "group_123",
                },
              ],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Item added to cart successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  message: { type: "string" },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid request data",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
    put: {
      summary: "Update cart item",
      description: "Update quantity or options of a cart item",
      tags: ["Cart"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                itemId: {
                  type: "string",
                  description: "Menu item ID",
                },
                quantity: {
                  type: "number",
                  minimum: 0,
                  maximum: 10,
                  description: "New quantity (0 to remove)",
                },
                notes: {
                  type: "string",
                  maxLength: 500,
                  description: "Special notes for the item",
                },
                selectedOptions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      optionId: { type: "string" },
                      groupId: { type: "string" },
                    },
                  },
                  description: "Selected options for the item",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Cart item updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  message: { type: "string" },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid request data",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
    delete: {
      summary: "Remove item from cart",
      description: "Remove a specific item from the cart",
      tags: ["Cart"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                itemId: {
                  type: "string",
                  description: "Menu item ID to remove",
                },
              },
            },
            example: {
              itemId: "item_123",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Item removed from cart successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  message: { type: "string" },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid request data",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },
  "/api/cart/coupon": {
    post: {
      summary: "Apply coupon to cart",
      description: "Apply a discount coupon to the cart",
      tags: ["Cart"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                  minLength: 1,
                  maxLength: 50,
                  description: "Coupon code",
                },
              },
            },
            example: {
              code: "SAVE10",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Coupon applied successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  message: { type: "string" },
                  discount: { type: "number" },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid coupon code",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "401": {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
      },
    },
  },
};
