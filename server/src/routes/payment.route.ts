import { Router } from "express";
import { createPaymentIntent } from "../controllers/payment.controller";

export const paymentRouter = Router();

// API for creating Stripe payment intent
paymentRouter.post("/stripe/create-payment-intent", createPaymentIntent);
