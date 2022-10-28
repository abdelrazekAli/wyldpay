import "dotenv/config";
import cors from "cors";
import nodemailer from "nodemailer";
import connect from "./utils/connect";
import express, { Application } from "express";

// Import Routes
import { authRouter } from "./routes/auth.route";
import { bankRouter } from "./routes/bank.route";
import { itemRouter } from "./routes/item.route";
import { userRouter } from "./routes/user.route";
import { orderRouter } from "./routes/order.route";
import { couponRouter } from "./routes/coupon.route";
import { paymentRouter } from "./routes/payment.route";
import { restaurantRouter } from "./routes/restaurant.route";

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
app.use("/api/v1/coupons", couponRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/restaurants", restaurantRouter);

app.post("/send_email", function (req, response) {
  const from = req.body.from;
  const to = req.body.to;
  const subject = req.body.subject;
  const message = req.body.message;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wyldpay@gmail.com",
      pass: "nhtmadisdjbwfuil",
    },
  });

  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
    // response.redirect("/");
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
