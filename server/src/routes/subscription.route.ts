import logger from "../config/logger.config";
import { stripe } from "../config/stripe.config";
import { UserProps } from "../types/user.type";
import { Request, Response, Router } from "express";
import { validateUserId } from "../utils/validation/Id.validation";
import { handleClientError, handleServerError } from "../utils/error";

export const subscriptionRouter = Router();

// Get all subscription prices from Stripe
subscriptionRouter.get("/prices", async (req: Request, res: Response) => {
  try {
    const prices = await stripe.prices.list({
      apiKey: process.env.STRIPE_SECRET_KEY!,
    });
    logger.info("Fetched subscription prices from Stripe");
    return res.json(prices);
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to fetch subscription prices");
  }
});

// Create Stripe payment session
subscriptionRouter.post("/session", async (req: Request, res: Response) => {
  let user: UserProps;
  const { userId } = req.params;

  try {
    const checkResult = await validateUserId(userId);
    if (typeof checkResult === "string") {
      return handleClientError(res, checkResult);
    } else {
      user = checkResult;
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
  } catch (error: unknown) {
    return handleServerError(
      res,
      error,
      `Failed to create Stripe payment session`
    );
  }
});

// Check user subscription
subscriptionRouter.post("/users/check", async (req: Request, res: Response) => {
  let user: UserProps;
  const { userId } = req.params;

  try {
    // Check user id
    const checkResult = await validateUserId(userId);
    if (typeof checkResult === "string") {
      return handleClientError(res, checkResult);
    } else {
      user = checkResult;
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
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to check user subscription");
  }
});
