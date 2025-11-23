// lib/stripe.ts
import Stripe from "stripe";

// Trim in case of accidental spaces in env var
const stripeSecretKey = process.env.STRIPE_SECRET_KEY?.trim();

if (!stripeSecretKey) {
  throw new Error(
    "STRIPE_SECRET_KEY is not defined. Set it in your .env and Vercel project settings."
  );
}

// Use a real Stripe API version (or omit apiVersion entirely)
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
  // or simply: {}  and let Stripe use your account's default version
});

export default stripe;
