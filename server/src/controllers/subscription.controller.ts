import { Request, Response } from "express";
import logger from "../config/logger.config";
import { UserProps } from "../types/user.type";
import { findUserById } from "../services/user.service";
import { handleClientError, handleServerError } from "../utils/error.util";
import {
  checkSubscriptions,
  fetchSubscriptionPrices,
  initiatePaymentSession,
} from "../services/stripe.service";

// Fetch subscription prices
export const getSubscriptionPrices = async (req: Request, res: Response) => {
  try {
    const prices = await fetchSubscriptionPrices();
    return res.json(prices.data);
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to fetch subscription prices");
  }
};

// Create a payment session for a user
export const createPaymentSession = async (req: Request, res: Response) => {
  const { userId, priceId } = req.body;

  try {
    const user = (await findUserById(userId)) as UserProps;
    if (!user) {
      return handleClientError(res, `User with id ${userId} not found`, 404);
    }

    const session = await initiatePaymentSession(
      priceId,
      user.stripeCustomerId
    );

    logger.info(`Created payment session for user: ${user._id}`);
    return res.json(session);
  } catch (error: unknown) {
    return handleServerError(
      res,
      error,
      "Failed to create Stripe payment session"
    );
  }
};

// Check the subscription status for a user
export const checkUserSubscription = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    const user = (await findUserById(userId)) as UserProps;
    if (!user) {
      return handleClientError(res, `User with id ${userId} not found`, 404);
    }

    const subscriptions = await checkSubscriptions(user.stripeCustomerId);
    return res.json(subscriptions);
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to check user subscription");
  }
};
