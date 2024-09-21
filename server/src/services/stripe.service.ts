import { stripe } from "../config/stripe.config";

// Create a new Stripe customer
export const createStripeCustomer = async (email: string): Promise<any> => {
  return await stripe.customers.create(
    { email },
    { apiKey: process.env.STRIPE_SECRET_KEY }
  );
};
