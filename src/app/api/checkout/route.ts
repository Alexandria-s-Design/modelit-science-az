import { NextRequest, NextResponse } from "next/server";
import { stripe, SUBSCRIPTION_TIERS, SubscriptionTier } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 500 }
      );
    }

    const { tier } = (await request.json()) as { tier: SubscriptionTier };

    if (!tier || !SUBSCRIPTION_TIERS[tier]) {
      return NextResponse.json(
        { error: "Invalid subscription tier" },
        { status: 400 }
      );
    }

    // Get authenticated user
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get or create Stripe customer
    const { data: profile } = await supabase
      .from("users")
      .select("email, display_name")
      .eq("id", user.id)
      .single() as { data: { email: string; display_name: string | null } | null };

    // Check for existing subscription
    const { data: existingSub } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .single() as { data: { stripe_customer_id: string } | null };

    let customerId = existingSub?.stripe_customer_id;

    if (!customerId) {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: profile?.email || user.email,
        name: profile?.display_name || undefined,
        metadata: {
          supabase_user_id: user.id,
        },
      });
      customerId = customer.id;
    }

    // Create checkout session with embedded mode
    const tierConfig = SUBSCRIPTION_TIERS[tier];
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [
        {
          price: tierConfig.priceId,
          quantity: 1,
        },
      ],
      ui_mode: "embedded",
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
          tier: tier,
          seats_limit: String(tierConfig.seats),
        },
      },
      metadata: {
        supabase_user_id: user.id,
        tier: tier,
      },
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
