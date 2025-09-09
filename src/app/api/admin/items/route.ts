import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be non-negative"),
  image: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  featured: z.boolean().default(false),
});

const updateItemSchema = z.object({
  name: z.string().min(1, "Item name is required").optional(),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be non-negative").optional(),
  image: z.string().optional(),
  categoryId: z.string().min(1, "Category is required").optional(),
  active: z.boolean().optional(),
  featured: z.boolean().optional(),
});

/**
 * @swagger
 * /api/admin/items:
 *   get:
 *     summary: Get all items
 *     description: Retrieve all menu items (admin only)
 *     tags: [Admin, Items]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *     responses:
 *       200:
 *         description: Items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Item'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create new item
 *     description: Create a new menu item (admin only)
 *     tags: [Admin, Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               featured:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Item created successfully
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
    const categoryId = searchParams.get("categoryId");

    const items = await prisma.item.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        optionGroups: {
          include: {
            options: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Get items error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve items" },
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
    const validatedData = createItemSchema.parse(body);

    // Convert price to cents
    const itemData = {
      ...validatedData,
      price: Math.round(validatedData.price * 100),
    };

    const item = await prisma.item.create({
      data: itemData,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        optionGroups: {
          include: {
            options: true,
          },
        },
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error("Create item error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}
