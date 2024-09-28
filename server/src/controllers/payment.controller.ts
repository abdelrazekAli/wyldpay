import { Request, Response } from "express";
import { handleServerError } from "../utils/error.util";
import { handleValidationError } from "../utils/validation/helper.validation";
import { validateStripePaymentIntent } from "../utils/validation/payment.validation";

// Create Stripe payment intent
export const createPaymentIntent = async (req: Request, res: Response) => {
  // Validate req body
  const { error, value: itemData } = validateStripePaymentIntent(req.body);
  if (error) return handleValidationError(res, error);

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
};
