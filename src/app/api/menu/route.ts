import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { menuQuerySchema } from "@/lib/validations/menu";
import { formatCategory, formatMenuItem } from "@/lib/utils/menu";

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Get menu items with categories
 *     description: Returns all active menu items organized by categories
 *     tags: [Menu]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *         description: Show only featured items
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in item names and descriptions
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           maximum: 100
 *         description: Limit number of results
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [name, price, createdAt]
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Menu data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MenuItem'
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      category: searchParams.get("category") || undefined,
      featured: searchParams.get("featured") === "true" ? true : undefined,
      search: searchParams.get("search") || undefined,
      limit: searchParams.get("limit")
        ? parseInt(searchParams.get("limit")!)
        : undefined,
      sort:
        (searchParams.get("sort") as "name" | "price" | "createdAt") ||
        undefined,
    };

    // Validate query parameters
    const validatedParams = menuQuerySchema.parse(queryParams);

    // Build where clause for items
    const itemWhere: {
      active: boolean;
      categoryId?: string;
      featured?: boolean;
      OR?: Array<{
        name?: { contains: string; mode: "insensitive" };
        description?: { contains: string; mode: "insensitive" };
      }>;
    } = {
      active: true,
    };

    if (validatedParams.category) {
      itemWhere.categoryId = validatedParams.category;
    }

    if (validatedParams.featured) {
      itemWhere.featured = true;
    }

    if (validatedParams.search) {
      itemWhere.OR = [
        { name: { contains: validatedParams.search, mode: "insensitive" } },
        {
          description: {
            contains: validatedParams.search,
            mode: "insensitive",
          },
        },
      ];
    }

    // Build order by clause
    let orderBy: {
      price?: "asc" | "desc";
      name?: "asc" | "desc";
      createdAt?: "asc" | "desc";
    } = {};
    if (validatedParams.sort === "price") {
      orderBy = { price: "asc" };
    } else if (validatedParams.sort === "name") {
      orderBy = { name: "asc" };
    } else if (validatedParams.sort === "createdAt") {
      orderBy = { createdAt: "desc" };
    } else {
      orderBy = { name: "asc" }; // default sort
    }

    // Fetch categories with items
    const categories = await prisma.category.findMany({
      where: { active: true },
      include: {
        items: {
          where: itemWhere,
          include: {
            category: true,
            optionGroups: {
              include: {
                options: true,
              },
            },
          },
          orderBy,
          take: validatedParams.limit,
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    // Format the response
    const formattedCategories = categories.map(formatCategory);

    // Extract all items for the items array
    const allItems = categories.flatMap((category) => category.items);
    const formattedItems = allItems.map(formatMenuItem);

    return NextResponse.json({
      categories: formattedCategories,
      items: formattedItems,
    });
  } catch (error) {
    console.error("Menu API error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid query parameters", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch menu data" },
      { status: 500 }
    );
  }
}
