export const orderEndpoints = {
  "/api/orders": {
    get: {
      summary: "Get user orders",
      description: "Retrieve orders for the current user",
      tags: ["Orders"],
      parameters: [
        {
          in: "query",
          name: "status",
          schema: { type: "string" },
          description: "Filter by order status",
        },
        {
          in: "query",
          name: "limit",
          schema: { type: "integer", maximum: 100 },
          description: "Limit number of results",
        },
        {
          in: "query",
          name: "offset",
          schema: { type: "integer", minimum: 0 },
          description: "Number of results to skip",
        },
      ],
      responses: {
        "200": {
          description: "Orders retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  orders: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        orderNumber: { type: "string" },
                        status: { type: "string" },
                        paymentMethod: { type: "string" },
                        paymentStatus: { type: "string" },
                        total: { type: "number" },
                        createdAt: { type: "string", format: "date-time" },
                        items: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: { type: "string" },
                              quantity: { type: "number" },
                              price: { type: "number" },
                              item: { $ref: "#/components/schemas/MenuItem" },
                            },
                          },
                        },
                      },
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
  },
  "/api/orders/{id}": {
    get: {
      summary: "Get order by ID",
      description: "Retrieve detailed information about a specific order",
      tags: ["Orders"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Order ID",
        },
      ],
      responses: {
        "200": {
          description: "Order retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  order: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      orderNumber: { type: "string" },
                      customerName: { type: "string" },
                      customerEmail: { type: "string" },
                      customerPhone: { type: "string" },
                      status: { type: "string" },
                      paymentMethod: { type: "string" },
                      paymentStatus: { type: "string" },
                      subtotal: { type: "number" },
                      tax: { type: "number" },
                      serviceFee: { type: "number" },
                      discount: { type: "number" },
                      total: { type: "number" },
                      notes: { type: "string" },
                      createdAt: { type: "string", format: "date-time" },
                      updatedAt: { type: "string", format: "date-time" },
                      items: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
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
                      payments: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            provider: { type: "string" },
                            status: { type: "string" },
                            amount: { type: "number" },
                            createdAt: { type: "string", format: "date-time" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Order not found",
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
  "/api/orders/{id}/receipt": {
    get: {
      summary: "Download order receipt",
      description: "Download a PDF receipt for the order",
      tags: ["Orders"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Order ID",
        },
      ],
      responses: {
        "200": {
          description: "Receipt PDF generated successfully",
          content: {
            "application/pdf": {
              schema: {
                type: "string",
                format: "binary",
              },
            },
          },
          headers: {
            "Content-Disposition": {
              description: "Attachment with filename",
              schema: {
                type: "string",
                example: "attachment; filename=receipt-ORD-001.pdf",
              },
            },
          },
        },
        "404": {
          description: "Order not found",
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
  "/api/checkout": {
    post: {
      summary: "Process checkout",
      description: "Create an order from cart and initiate payment",
      tags: ["Orders"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                customerName: {
                  type: "string",
                  minLength: 1,
                  maxLength: 100,
                  description: "Customer name",
                },
                customerEmail: {
                  type: "string",
                  format: "email",
                  description: "Customer email",
                },
                customerPhone: {
                  type: "string",
                  minLength: 1,
                  maxLength: 20,
                  description: "Customer phone number",
                },
                paymentMethod: {
                  type: "string",
                  enum: ["CARD", "COD"],
                  description: "Payment method",
                },
                notes: {
                  type: "string",
                  maxLength: 500,
                  description: "Order notes",
                },
                couponCode: {
                  type: "string",
                  description: "Coupon code to apply",
                },
              },
            },
            example: {
              customerName: "John Doe",
              customerEmail: "john@example.com",
              customerPhone: "+1234567890",
              paymentMethod: "CARD",
              notes: "Please deliver to the back door",
              couponCode: "SAVE10",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Checkout processed successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  orderId: { type: "string" },
                  orderNumber: { type: "string" },
                  paymentResult: { type: "object" },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid request data or cart empty",
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
