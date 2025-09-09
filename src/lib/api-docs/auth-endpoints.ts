export const authEndpoints = {
  "/api/auth/register": {
    post: {
      summary: "Register a new user",
      description: "Create a new user account with the provided information",
      tags: ["Authentication"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegisterRequest",
            },
            example: {
              name: "John Doe",
              email: "john@example.com",
              password: "password123",
              phone: "+1234567890",
              address: "123 Main St, City, State",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Success",
              },
              example: {
                message: "User created successfully",
                user: {
                  id: "user_id_123",
                  name: "John Doe",
                  email: "john@example.com",
                  role: "CUSTOMER",
                  phone: "+1234567890",
                  address: "123 Main St, City, State",
                  createdAt: "2024-01-01T00:00:00.000Z",
                },
              },
            },
          },
        },
        "400": {
          description: "Bad request - validation error or user already exists",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                error: "User with this email already exists",
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                error: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
  "/api/auth/signin": {
    post: {
      summary: "Sign in user",
      description: "Authenticate user with credentials using NextAuth.js",
      tags: ["Authentication"],
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              required: ["email", "password", "csrfToken"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  description: "User email address",
                },
                password: {
                  type: "string",
                  description: "User password",
                },
                csrfToken: {
                  type: "string",
                  description: "CSRF token from /api/auth/csrf",
                },
                callbackUrl: {
                  type: "string",
                  description: "URL to redirect after successful login",
                },
              },
            },
            example: {
              email: "customer@example.com",
              password: "customer123",
              csrfToken: "your-csrf-token-here",
              callbackUrl: "/dashboard",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Sign in successful (redirects to callback URL)",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  url: {
                    type: "string",
                    description: "Redirect URL",
                  },
                },
              },
              example: {
                url: "/dashboard",
              },
            },
          },
        },
        "401": {
          description: "Invalid credentials",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                error: "Invalid credentials",
              },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
  },
  "/api/auth/signout": {
    post: {
      summary: "Sign out user",
      description: "Logout user and clear session",
      tags: ["Authentication"],
      requestBody: {
        required: true,
        content: {
          "application/x-www-form-urlencoded": {
            schema: {
              type: "object",
              required: ["csrfToken"],
              properties: {
                csrfToken: {
                  type: "string",
                  description: "CSRF token from /api/auth/csrf",
                },
                callbackUrl: {
                  type: "string",
                  description: "URL to redirect after logout",
                },
              },
            },
            example: {
              csrfToken: "your-csrf-token-here",
              callbackUrl: "/",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Sign out successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  url: {
                    type: "string",
                    description: "Redirect URL",
                  },
                },
              },
              example: {
                url: "/",
              },
            },
          },
        },
      },
    },
  },
  "/api/auth/session": {
    get: {
      summary: "Get current session",
      description: "Retrieve the current user session",
      tags: ["Authentication"],
      responses: {
        "200": {
          description: "Session retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: {
                    $ref: "#/components/schemas/User",
                  },
                  expires: {
                    type: "string",
                    format: "date-time",
                    description: "Session expiration time",
                  },
                },
              },
              example: {
                user: {
                  id: "user_id_123",
                  name: "John Doe",
                  email: "john@example.com",
                  role: "CUSTOMER",
                },
                expires: "2024-12-31T23:59:59.000Z",
              },
            },
          },
        },
        "401": {
          description: "No active session",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                error: "No active session",
              },
            },
          },
        },
      },
    },
  },
  "/api/auth/csrf": {
    get: {
      summary: "Get CSRF token",
      description: "Retrieve CSRF token for form protection",
      tags: ["Authentication"],
      responses: {
        "200": {
          description: "CSRF token retrieved",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  csrfToken: {
                    type: "string",
                    description: "CSRF token for form protection",
                  },
                },
              },
              example: {
                csrfToken: "abc123def456ghi789",
              },
            },
          },
        },
      },
    },
  },
};
