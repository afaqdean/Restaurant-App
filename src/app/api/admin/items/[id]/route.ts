import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

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
 * /api/admin/items/{id}:
 *   get:
 *     summary: Get item by ID
 *     description: Retrieve a specific item (admin only)
 *     tags: [Admin, Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID
 *     responses:
 *       200:
 *         description: Item retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update item
 *     description: Update an item (admin only)
 *     tags: [Admin, Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID
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
 *               active:
 *                 type: boolean
 *               featured:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete item
 *     description: Delete an item (admin only)
 *     tags: [Admin, Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const item = await prisma.item.findUnique({
      where: { id },
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

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ item });
  } catch (error) {
    console.error("Get item error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = updateItemSchema.parse(body);

    // Convert price to cents if provided
    const updateData =
      validatedData.price !== undefined
        ? { ...validatedData, price: Math.round(validatedData.price * 100) }
        : validatedData;

    const item = await prisma.item.update({
      where: { id },
      data: updateData,
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

    return NextResponse.json({ item });
  } catch (error) {
    console.error("Update item error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Check if item has been ordered
    const orderItemsCount = await prisma.orderItem.count({
      where: { itemId: id },
    });

    if (orderItemsCount > 0) {
      return NextResponse.json(
        { error: "Cannot delete item that has been ordered" },
        { status: 400 }
      );
    }

    await prisma.item.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete item error:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
