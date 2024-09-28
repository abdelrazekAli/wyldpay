import { Router } from "express";
import {
  getSubscriptionPrices,
  createPaymentSession,
  checkUserSubscription,
} from "../controllers/subscription.controller";

export const subscriptionRouter = Router();

// Get all subscription prices from Stripe
subscriptionRouter.get("/prices", getSubscriptionPrices);

// Create Stripe payment session
subscriptionRouter.post("/session", createPaymentSession);

// Check user subscription
subscriptionRouter.post("/users/check", checkUserSubscription);
