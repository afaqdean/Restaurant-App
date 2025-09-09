import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
      ? "Set"
      : "Not set",
    stripeSecretKey: process.env.STRIPE_SECRET_KEY ? "Set" : "Not set",
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ? "Set" : "Not set",
    publicKeyPreview:
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY?.substring(0, 20) + "...",
  });
}
