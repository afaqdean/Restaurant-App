import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { formatMenuItem } from "@/lib/utils/menu";

/**
 * @swagger
 * /api/menu/featured:
 *   get:
 *     summary: Get featured menu items
 *     description: Returns all featured menu items across categories
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: Featured items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MenuItem'
 *       500:
 *         description: Internal server error
 */
export async function GET() {
  try {
    const featuredItems = await prisma.item.findMany({
      where: {
        active: true,
        featured: true,
      },
      include: {
        category: true,
        optionGroups: {
          include: {
            options: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    const formattedItems = featuredItems.map(formatMenuItem);

    return NextResponse.json({ items: formattedItems });
  } catch (error) {
    console.error("Featured items API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured items" },
      { status: 500 }
    );
  }
}



