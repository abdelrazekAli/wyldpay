import { Router } from "express";
import { Request, Response } from "express";
import { validateStripePaymentIntent } from "../utils/validation";

export const paymentRouter = Router();

// API for create stripe payment intent
paymentRouter.post(
  "/stripe/create-payment-intent",
  async (req: Request, res: Response) => {
    // Validate req body
    let validationResult = validateStripePaymentIntent(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    const { currency, secretKey, amount } = req.body as {
      currency: string;
      secretKey: string;
      amount: number;
    };
    const stripe = require("stripe")(secretKey);
    try {
      const { client_secret } = await stripe.paymentIntents.create({
        amount: Math.trunc(amount * 100),
        currency,
      });

      res.status(200).send({
        clientSecret: client_secret,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);
