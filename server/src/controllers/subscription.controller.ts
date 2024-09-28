import { Request, Response } from "express";
import logger from "../config/logger.config";
import { UserProps } from "../types/user.type";
import { stripe } from "../config/stripe.config";
import { findUserById } from "../services/user.service";
import { handleClientError, handleServerError } from "../utils/error.util";

// Get all subscription prices from Stripe
export const getSubscriptionPrices = async (req: Request, res: Response) => {
  try {
    const prices = await stripe.prices.list({
      apiKey: process.env.STRIPE_SECRET_KEY!,
    });
    logger.info("Fetched subscription prices from Stripe");
    return res.json(prices);
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to fetch subscription prices");
  }
};

// Create Stripe payment session
export const createPaymentSession = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const user = (await findUserById(userId)) as UserProps;
    if (!user)
      return handleClientError(res, `User with id ${userId} not found`, 404);

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
  } catch (error: unknown) {
    return handleServerError(
      res,
      error,
      `Failed to create Stripe payment session`
    );
  }
};

// Check user subscription
export const checkUserSubscription = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const user = (await findUserById(userId)) as UserProps;
    if (!user)
      return handleClientError(res, `User with id ${userId} not found`, 404);

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
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to check user subscription");
  }
};
