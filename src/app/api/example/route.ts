import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Get example data
 *     description: Returns a simple example response
 *     tags: [Example]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *             example:
 *               message: "Hello from the API!"
 *               timestamp: "2024-01-01T00:00:00.000Z"
 */

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Hello from the API!",
    timestamp: new Date().toISOString(),
  });
}
