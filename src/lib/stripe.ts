import Stripe from "stripe";

// Only initialize Stripe when the secret key is available (prevents build errors)
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-12-15.clover",
      typescript: true,
    })
  : (null as unknown as Stripe);

// Subscription tier metadata
export const SUBSCRIPTION_TIERS = {
  teacher: {
    name: "Teacher",
    seats: 36,
    price: 99,
    priceId: process.env.STRIPE_PRICE_TEACHER || "",
  },
  school: {
    name: "School",
    seats: -1, // Unlimited
    price: 499,
    priceId: process.env.STRIPE_PRICE_SCHOOL || "",
  },
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_TIERS;
