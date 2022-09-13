import cors from "cors";
import express, { Application, Request, Response } from "express";
import { authRouter } from "./routes/auth.route";
import "dotenv/config";
import connect from "./utils/connect";
const app: Application = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Middlewares
app.use(express.json());
app.use(cors());

// API for auth
app.use("/api/v1", authRouter);

// API for PAYMENT

app.post("/payment/create", async (req: Request, res: Response) => {
  const total = req.body.amount;

  const payment = await stripe.paymentIntents.create({
    amount: total * 100,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: payment.client_secret,
  });
});

// For production
app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: __dirname + "/client/build",
  });
});

const port = process.env.PORT || 8000;
app.listen(port, async () => {
  console.log("listening on the port", port);
  await connect();
});
