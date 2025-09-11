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
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering (YYYY-MM-DD)
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [json, csv]
 *         description: Response format
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
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const format = searchParams.get("format") || "json";

    // Build date filter
    const dateFilter: { createdAt?: { gte?: Date; lte?: Date } } = {};
    if (startDate || endDate) {
      dateFilter.createdAt = {};
      if (startDate) {
        dateFilter.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        // Add one day to endDate to include the entire end date
        const endDateObj = new Date(endDate);
        endDateObj.setDate(endDateObj.getDate() + 1);
        dateFilter.createdAt.lte = endDateObj;
      }
    }

    const expenses = await prisma.expense.findMany({
      where: {
        ...(category && {
          category: category as
            | "FOOD"
            | "UTILITIES"
            | "RENT"
            | "SUPPLIES"
            | "MARKETING"
            | "OTHER",
        }),
        ...(paid !== null && { paid: paid === "true" }),
        ...dateFilter,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (format === "csv") {
      // Generate CSV
      const csvHeaders =
        "Date,Description,Category,Vendor,Amount,Status,Notes\n";
      const csvRows = expenses
        .map((expense) => {
          const date = new Date(expense.createdAt).toISOString().split("T")[0];
          const amount = (expense.amount / 100).toFixed(2);
          const status = expense.paid ? "Paid" : "Unpaid";
          const description = expense.description.replace(/"/g, '""'); // Escape quotes
          const vendor = (expense.vendor || "").replace(/"/g, '""'); // Escape quotes
          const notes = (expense.notes || "").replace(/"/g, '""'); // Escape quotes

          return `"${date}","${description}","${expense.category}","${vendor}","${amount}","${status}","${notes}"`;
        })
        .join("\n");

      const csv = csvHeaders + csvRows;

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="expenses-${
            new Date().toISOString().split("T")[0]
          }.csv"`,
        },
      });
    }

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
