export const adminPaymentEndpoints = {
  "/api/admin/payments/{id}/confirm": {
    post: {
      summary: "Confirm payment (admin)",
      description: "Manually confirm a payment (admin only)",
      tags: ["Admin"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Payment ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                confirmed: {
                  type: "boolean",
                  description: "Whether payment is confirmed",
                },
                notes: {
                  type: "string",
                  description: "Admin notes about the confirmation",
                },
              },
            },
            example: {
              confirmed: true,
              notes: "Payment received via cash",
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
          description: "Payment not found",
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
  "/api/admin/payments/{id}/refund": {
    post: {
      summary: "Process refund (admin)",
      description: "Process a refund for a payment (admin only)",
      tags: ["Admin"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "Payment ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                amount: {
                  type: "number",
                  minimum: 0,
                  description: "Refund amount (if partial refund)",
                },
                reason: {
                  type: "string",
                  description: "Reason for refund",
                },
                notes: {
                  type: "string",
                  description: "Additional notes",
                },
              },
            },
            example: {
              amount: 1500,
              reason: "Customer requested refund due to order cancellation",
              notes: "Refund processed via Stripe",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Refund processed successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean" },
                  message: { type: "string" },
                  refundId: { type: "string" },
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
        "403": {
          description: "Admin access required",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Error" },
            },
          },
        },
        "404": {
          description: "Payment not found",
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
