import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSettingsSchema = z.object({
  settings: z.record(z.string(), z.any()),
});

/**
 * @swagger
 * /api/admin/settings:
 *   get:
 *     summary: Get all settings
 *     description: Retrieve all system settings (admin only)
 *     tags: [Admin, Settings]
 *     responses:
 *       200:
 *         description: Settings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 settings:
 *                   type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update settings
 *     description: Update system settings (admin only)
 *     tags: [Admin, Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               settings:
 *                 type: object
 *     responses:
 *       200:
 *         description: Settings updated successfully
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

    const settings = await prisma.settings.findMany();

    // Convert settings array to object
    const settingsObject = settings.reduce((acc, setting) => {
      let value = setting.value;

      // Parse value based on type
      switch (setting.type) {
        case "NUMBER":
          value = parseFloat(value);
          break;
        case "BOOLEAN":
          value = value === "true";
          break;
        case "JSON":
          try {
            value = JSON.parse(value);
          } catch {
            value = value;
          }
          break;
        default:
          value = value;
      }

      acc[setting.key] = value;
      return acc;
    }, {} as Record<string, any>);

    return NextResponse.json({ settings: settingsObject });
  } catch (error) {
    console.error("Get settings error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = updateSettingsSchema.parse(body);

    // Update settings in transaction
    const result = await prisma.$transaction(async (tx) => {
      const updates = [];

      for (const [key, value] of Object.entries(validatedData.settings)) {
        let stringValue = value;
        let type = "STRING";

        // Determine type and convert to string
        if (typeof value === "number") {
          stringValue = value.toString();
          type = "NUMBER";
        } else if (typeof value === "boolean") {
          stringValue = value.toString();
          type = "BOOLEAN";
        } else if (typeof value === "object") {
          stringValue = JSON.stringify(value);
          type = "JSON";
        }

        updates.push(
          tx.settings.upsert({
            where: { key },
            update: { value: stringValue, type: type as any },
            create: { key, value: stringValue, type: type as any },
          })
        );
      }

      return await Promise.all(updates);
    });

    return NextResponse.json({ success: true, updated: result.length });
  } catch (error) {
    console.error("Update settings error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
