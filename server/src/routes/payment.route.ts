import logger from "../utils/logger";
import { handleServerError } from "../utils/error";
import { Request, Response, Router } from "express";
import { handleValidationError } from "../utils/validation/helper.validation";
import { validateStripePaymentIntent } from "../utils/validation/payment.validation";

export const paymentRouter = Router();

// API for creating Stripe payment intent
paymentRouter.post(
  "/stripe/create-payment-intent",
  async (req: Request, res: Response) => {
    // Validate req body
    let validationResult = validateStripePaymentIntent(req.body);
    if (validationResult) {
      logger.error(
        `Invalid payment intent data: ${validationResult.details[0].message}`
      );
      return handleValidationError(res, validationResult);
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
    } catch (error: unknown) {
      return handleServerError(
        res,
        error,
        `Failed to create Stripe payment intent`
      );
    }
  }
);
