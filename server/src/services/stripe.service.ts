import { stripe } from "../config/stripe.config";

const { BASE_URL, STRIPE_SECRET_KEY } = process.env;

// Create a new Stripe customer
export const createStripeCustomer = async (email: string): Promise<any> => {
  return await stripe.customers.create(
    { email },
    { apiKey: STRIPE_SECRET_KEY }
  );
};

// Fetch Stripe subscription prices
export const fetchSubscriptionPrices = async () => {
  return await stripe.prices.list({ apiKey: STRIPE_SECRET_KEY });
};

// Create Stripe payment session
export const initiatePaymentSession = async (
  priceId: string,
  stripeCustomerId: string
) => {
  return await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${BASE_URL}/admin/subscription-success`,
    cancel_url: `${BASE_URL}/admin/subscription-failed`,
    customer: stripeCustomerId,
  });
};

// Check Stripe user subscription
export const checkSubscriptions = async (stripeCustomerId: string) => {
  return await stripe.subscriptions.list({
    customer: stripeCustomerId,
    status: "all",
    expand: ["data.default_payment_method"],
  });
};
