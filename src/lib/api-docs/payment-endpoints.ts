export const paymentEndpoints = {
  "/api/payments/cod/confirm": {
    post: {
      summary: "Confirm COD payment",
      description: "Confirms a Cash on Delivery payment (admin only)",
      tags: ["Payments"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                orderId: {
                  type: "string",
                  description: "Order ID",
                },
                confirmed: {
                  type: "boolean",
                  description: "Whether payment is confirmed",
                },
              },
            },
            example: {
              orderId: "order_123",
              confirmed: true,
            },
          },
        },
      },
      responses: {
        "200": {
          description: "COD payment confirmed successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  message: { type: "string" },
                },
              },
              example: {
                success: true,
                message: "COD payment confirmed successfully",
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
        "403": {
          description: "Admin access required",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "404": {
          description: "COD payment not found or already processed",
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
  "/api/payments/stripe/create-intent": {
    post: {
      summary: "Create Stripe payment intent",
      description: "Creates a Stripe payment intent for an order",
      tags: ["Payments"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                orderId: {
                  type: "string",
                  description: "Order ID",
                },
              },
            },
            example: {
              orderId: "order_123",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Payment intent created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  paymentId: { type: "string" },
                  stripePaymentIntentId: { type: "string" },
                  clientSecret: { type: "string" },
                  requiresAction: { type: "boolean" },
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
  "/api/payments/stripe/confirm": {
    post: {
      summary: "Confirm Stripe payment",
      description: "Confirms a Stripe payment intent",
      tags: ["Payments"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                paymentIntentId: {
                  type: "string",
                  description: "Stripe payment intent ID",
                },
              },
            },
            example: {
              paymentIntentId: "pi_1234567890",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Payment confirmed successfully",
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
          description: "Payment confirmation failed",
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
  "/api/payments/stripe/webhook": {
    post: {
      summary: "Stripe webhook handler",
      description: "Handles Stripe webhook events for payment status updates",
      tags: ["Payments"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              description: "Stripe webhook event payload",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Webhook processed successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  received: { type: "boolean" },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid webhook payload",
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
