import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the API version you are using
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: Request) {
  try {
    const { priceId, userId } = await req.json();

    // Validate the required parameters
    if (!priceId || !userId) {
      return NextResponse.json(
        { error: "Missing priceId or userId" },
        { status: 400 }
      );
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/generate?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      client_reference_id: userId,
    });

    // Return the session ID in the response
    return NextResponse.json({ sessionId: session.id });

  } catch (error) {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      console.error("Error creating checkout session:", error);
      return NextResponse.json(
        { error: "Error creating checkout session", details: error.message },
        { status: 500 }
      );
    } else {
      // Handle any other unknown errors
      console.error("Unknown error:", error);
      return NextResponse.json(
        { error: "Unknown error", details: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
