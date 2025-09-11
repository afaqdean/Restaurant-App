import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateSettingsSchema = z.object({
  settings: z.record(z.string(), z.unknown()),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const settings = await prisma.settings.findMany({
      orderBy: { key: "asc" },
    });

    // Convert settings array to object
    const settingsObject = settings.reduce((acc, setting) => {
      let value: unknown = setting.value;

      // Parse value based on type
      switch (setting.type) {
        case "NUMBER":
          const numValue = parseFloat(String(value));
          value = isNaN(numValue) ? 0 : numValue;
          break;
        case "BOOLEAN":
          value = String(value) === "true";
          break;
        case "JSON":
          try {
            value = JSON.parse(String(value));
          } catch (parseError) {
            console.warn(
              `Failed to parse JSON for setting ${setting.key}:`,
              parseError
            );
            value = value; // Keep as string if parsing fails
          }
          break;
        default:
          value = value;
      }

      acc[setting.key] = value;
      return acc;
    }, {} as Record<string, unknown>);

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

    // Validate that settings object is not empty
    if (
      !validatedData.settings ||
      Object.keys(validatedData.settings).length === 0
    ) {
      return NextResponse.json(
        { error: "Settings object cannot be empty" },
        { status: 400 }
      );
    }

    // Update settings in transaction
    const result = await prisma.$transaction(async (tx) => {
      const updates = [];

      for (const [key, value] of Object.entries(validatedData.settings)) {
        // Validate key is not empty
        if (!key || key.trim().length === 0) {
          throw new Error("Setting key cannot be empty");
        }

        let stringValue: string;
        let type: "STRING" | "NUMBER" | "BOOLEAN" | "JSON";

        // Determine type and convert to string
        if (typeof value === "number") {
          stringValue = value.toString();
          type = "NUMBER";
        } else if (typeof value === "boolean") {
          stringValue = value.toString();
          type = "BOOLEAN";
        } else if (typeof value === "object" && value !== null) {
          try {
            stringValue = JSON.stringify(value);
            type = "JSON";
          } catch (jsonError) {
            console.warn(
              `Failed to stringify JSON for setting ${key}:`,
              jsonError
            );
            stringValue = String(value);
            type = "STRING";
          }
        } else {
          stringValue = String(value);
          type = "STRING";
        }

        updates.push(
          tx.settings.upsert({
            where: { key: key.trim() },
            update: { value: stringValue, type },
            create: { key: key.trim(), value: stringValue, type },
          })
        );
      }

      return await Promise.all(updates);
    });

    return NextResponse.json({ success: true, updated: result.length });
  } catch (error) {
    console.error("Update settings error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.format() },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      // Handle specific database or validation errors
      if (error.message.includes("Setting key cannot be empty")) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
