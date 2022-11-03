import { Router } from "express";
import { stripe } from "../utils/stripe";
import { Request, Response } from "express";

export const subscriptionRouter = Router();

// Get all subscription prices from stripe
subscriptionRouter.get("/prices", async (req: Request, res: Response) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  // Response
  return res.json(prices);
});
