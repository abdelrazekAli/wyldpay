import logger from "../utils/logger";
import { Request, Response, Router } from "express";
import { validateStripePaymentIntent } from "../utils/validation";

export const paymentRouter = Router();

// API for creating Stripe payment intent
paymentRouter.post(
  "/stripe/create-payment-intent",
  async (req: Request, res: Response) => {
    // Validate req body
    let validationResult = validateStripePaymentIntent(req.body);
    if (validationResult) {
      logger.warn(
        `Invalid payment intent data: ${validationResult.details[0].message}`
      );
      return res.status(400).send(validationResult.details[0].message);
    }

    const { currency, secretKey, amount } = req.body as {
      currency: string;
      secretKey: string;
      amount: number;
    };

    try {
      const stripe = require("stripe")(secretKey);
      const { client_secret } = await stripe.paymentIntents.create({
        amount: Math.trunc(amount * 100),
        currency,
      });

      // Response
      res.status(200).send({
        clientSecret: client_secret,
      });
    } catch (err) {
      logger.error(
        `Failed to create Stripe payment intent, Error: ${err.message}`
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
