import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type Stripe from "stripe";

// Lazy-initialize Supabase admin client to avoid build errors
let supabaseAdmin: SupabaseClient | null = null;

function getSupabaseAdmin(): SupabaseClient {
  if (!supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("Supabase configuration missing");
    }
    supabaseAdmin = createClient(url, key);
  }
  return supabaseAdmin;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.supabase_user_id;
  const tier = session.metadata?.tier || "teacher";

  if (!userId || !session.subscription) {
    console.error("Missing user ID or subscription in checkout session");
    return;
  }

  // Retrieve the full subscription details
  const subscriptionResponse = await stripe.subscriptions.retrieve(
    session.subscription as string
  );

  // Extract subscription data
  const subscriptionData = subscriptionResponse as unknown as {
    id: string;
    status: string;
    metadata: Record<string, string>;
    current_period_start: number;
    current_period_end: number;
  };

  const seatsLimit = subscriptionData.metadata?.seats_limit
    ? parseInt(subscriptionData.metadata.seats_limit)
    : tier === "school"
    ? -1
    : 36;

  // Upsert subscription record
  const { error } = await getSupabaseAdmin().from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: subscriptionData.id,
      tier: tier as "teacher" | "school" | "district",
      status: subscriptionData.status as "active" | "trialing" | "past_due" | "canceled",
      seats_limit: seatsLimit,
      current_period_start: new Date(
        subscriptionData.current_period_start * 1000
      ).toISOString(),
      current_period_end: new Date(
        subscriptionData.current_period_end * 1000
      ).toISOString(),
    },
    {
      onConflict: "user_id",
    }
  );

  if (error) {
    console.error("Failed to create subscription record:", error);
    throw error;
  }

  console.log(`Subscription created for user ${userId}`);
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.supabase_user_id;

  if (!userId) {
    console.error("Missing user ID in subscription metadata");
    return;
  }

  // Cast to get raw properties
  const subData = subscription as unknown as {
    id: string;
    status: string;
    current_period_start: number;
    current_period_end: number;
  };

  const { error } = await getSupabaseAdmin()
    .from("subscriptions")
    .update({
      status: subData.status as "active" | "trialing" | "past_due" | "canceled",
      current_period_start: new Date(
        subData.current_period_start * 1000
      ).toISOString(),
      current_period_end: new Date(
        subData.current_period_end * 1000
      ).toISOString(),
    })
    .eq("stripe_subscription_id", subData.id);

  if (error) {
    console.error("Failed to update subscription:", error);
    throw error;
  }

  console.log(`Subscription updated for user ${userId}`);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const { error } = await getSupabaseAdmin()
    .from("subscriptions")
    .update({ status: "canceled" })
    .eq("stripe_subscription_id", subscription.id);

  if (error) {
    console.error("Failed to mark subscription as canceled:", error);
    throw error;
  }

  console.log(`Subscription ${subscription.id} marked as canceled`);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // Cast to access subscription property
  const invoiceData = invoice as unknown as { subscription: string | null };
  if (!invoiceData.subscription) return;

  const { error } = await getSupabaseAdmin()
    .from("subscriptions")
    .update({ status: "past_due" })
    .eq("stripe_subscription_id", invoiceData.subscription);

  if (error) {
    console.error("Failed to mark subscription as past_due:", error);
    throw error;
  }

  // TODO: Send email notification to user about payment failure
  console.log(`Payment failed for subscription ${invoiceData.subscription}`);
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  // Cast to access subscription property
  const invoiceData = invoice as unknown as { subscription: string | null };
  if (!invoiceData.subscription) return;

  // Clear any past_due status
  const { error } = await getSupabaseAdmin()
    .from("subscriptions")
    .update({ status: "active" })
    .eq("stripe_subscription_id", invoiceData.subscription);

  if (error) {
    console.error("Failed to update subscription status:", error);
    throw error;
  }

  console.log(`Payment succeeded for subscription ${invoiceData.subscription}`);
}
