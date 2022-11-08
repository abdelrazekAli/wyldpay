import "dotenv/config";
import cors from "cors";
import connect from "./utils/connect";
import express, { Application } from "express";

// Import Routes
import { authRouter } from "./routes/auth.route";
import { bankRouter } from "./routes/bank.route";
import { itemRouter } from "./routes/item.route";
import { userRouter } from "./routes/user.route";
import { orderRouter } from "./routes/order.route";
import { emailRouter } from "./routes/email.route";
import { couponRouter } from "./routes/coupon.route";
import { paymentRouter } from "./routes/payment.route";
import { restaurantRouter } from "./routes/restaurant.route";
import { subscriptionRouter } from "./routes/subscription.route";

require('dotenv').config();

// Middlewares
const app: Application = express();
app.use(express.json());
app.use(cors());

// APIs
app.use("/api/v1", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/items", itemRouter);
app.use("/api/v1/banks", bankRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/emails", emailRouter);
app.use("/api/v1/coupons", couponRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

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
