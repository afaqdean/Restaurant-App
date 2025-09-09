import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createExpenseSchema = z.object({
  amount: z.number().min(0, "Amount must be non-negative"),
  description: z.string().min(1, "Description is required"),
  category: z.enum([
    "FOOD",
    "UTILITIES",
    "RENT",
    "SUPPLIES",
    "MARKETING",
    "OTHER",
  ]),
  vendor: z.string().optional(),
  receipt: z.string().optional(),
  notes: z.string().optional(),
});

const updateExpenseSchema = z.object({
  amount: z.number().min(0, "Amount must be non-negative").optional(),
  description: z.string().min(1, "Description is required").optional(),
  category: z
    .enum(["FOOD", "UTILITIES", "RENT", "SUPPLIES", "MARKETING", "OTHER"])
    .optional(),
  vendor: z.string().optional(),
  receipt: z.string().optional(),
  paid: z.boolean().optional(),
  notes: z.string().optional(),
});

/**
 * @swagger
 * /api/admin/expenses:
 *   get:
 *     summary: Get all expenses
 *     description: Retrieve all expenses (admin only)
 *     tags: [Admin, Expenses]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [FOOD, UTILITIES, RENT, SUPPLIES, MARKETING, OTHER]
 *         description: Filter by expense category
 *       - in: query
 *         name: paid
 *         schema:
 *           type: boolean
 *         description: Filter by paid status
 *     responses:
 *       200:
 *         description: Expenses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 expenses:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Expense'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create new expense
 *     description: Create a new expense (admin only)
 *     tags: [Admin, Expenses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [FOOD, UTILITIES, RENT, SUPPLIES, MARKETING, OTHER]
 *               vendor:
 *                 type: string
 *               receipt:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const paid = searchParams.get("paid");

    const expenses = await prisma.expense.findMany({
      where: {
        ...(category && { category: category as any }),
        ...(paid !== null && { paid: paid === "true" }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ expenses });
  } catch (error) {
    console.error("Get expenses error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve expenses" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = createExpenseSchema.parse(body);

    // Convert amount to cents
    const expenseData = {
      ...validatedData,
      amount: Math.round(validatedData.amount * 100),
    };

    const expense = await prisma.expense.create({
      data: expenseData,
    });

    return NextResponse.json({ expense }, { status: 201 });
  } catch (error) {
    console.error("Create expense error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create expense" },
      { status: 500 }
    );
  }
}
