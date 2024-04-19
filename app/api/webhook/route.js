import { stripe } from "@/lib/stripe";
import PurchasesModel from "@/models/purchases";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId;

    if (!userId || !courseId) {
      return new NextResponse(`Webhook Error: Missin metadata`, {
        status: 400,
      });
    }
    console.log("event", event.type);
    await PurchasesModel.create({
      userId: userId,
      courseId: courseId,
    });
  } else {
    return new NextResponse(
      `Webhook Error: Unhendled event type ${event.type}`,
      { status: 200 }
    );
  }

  return new NextResponse(null, { status: 200 });
}
