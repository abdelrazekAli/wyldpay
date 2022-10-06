import { Router } from "express";
import { Request, Response } from "express";

export const paymentRouter = Router();

// API for PAYMENT
paymentRouter.post(
  "/payment/stripe/create",
  async (req: Request, res: Response) => {
    const total = req.body.amount;
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const payment = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "usd",
    });

    res.status(201).send({
      clientSecret: payment.client_secret,
    });
  }
);
