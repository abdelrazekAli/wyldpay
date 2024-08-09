import logger from "../utils/logger";
import { stripe } from "../utils/stripe";
import UserModel from "../models/user.model";
import { Request, Response, Router } from "express";

export const subscriptionRouter = Router();

// Get all subscription prices from Stripe
subscriptionRouter.get("/prices", async (req: Request, res: Response) => {
  try {
    const prices = await stripe.prices.list({
      apiKey: process.env.STRIPE_SECRET_KEY!,
    });
    logger.info("Fetched subscription prices from Stripe");
    return res.json(prices);
  } catch (error) {
    logger.error("Failed to fetch subscription prices", {
      error: error.message,
    });
    return res.status(500).json({ error: "Failed to fetch prices" });
  }
});

// Create Stripe payment session
subscriptionRouter.post("/session", async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    if (!user) {
      logger.warn(`User not found: ${req.body.userId}`);
      return res.status(404).json({ error: "User not found" });
    }

    const session = await stripe.checkout.sessions.create(
      {
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: req.body.priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.BASE_URL}/admin/subscription-success`,
        cancel_url: `${process.env.BASE_URL}/admin/subscription-failed`,
        customer: user.stripeCustomerId,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY!,
      }
    );

    logger.info(`Created Stripe session for user: ${user._id}`);
    return res.json(session);
  } catch (error) {
    logger.error("Failed to create Stripe payment session", {
      error: error.message,
    });
    return res.status(500).json({ error: "Failed to create payment session" });
  }
});

// Check user subscription
subscriptionRouter.post("/users/check", async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    if (!user) {
      logger.warn(`User not found: ${req.body.userId}`);
      return res.status(404).json({ error: "User not found" });
    }

    const subscriptions = await stripe.subscriptions.list(
      {
        customer: user.stripeCustomerId,
        status: "all",
        expand: ["data.default_payment_method"],
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY!,
      }
    );

    logger.info(`Fetched subscriptions for user: ${user._id}`);
    return res.json(subscriptions);
  } catch (error) {
    logger.error("Failed to check user subscription", { error: error.message });
    return res.status(500).json({ error: "Failed to check subscription" });
  }
});
