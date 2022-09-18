import "dotenv/config";
import cors from "cors";
import connect from "./utils/connect";
import express, { Application } from "express";
import { authRouter } from "./routes/auth.route";
import { bankRouter } from "./routes/bank.route";
import { paymentRouter } from "./routes/payment.route";
import { restaurantRouter } from "./routes/restaurant.route";

// Middlewares
const app: Application = express();
app.use(express.json());
app.use(cors());

// APIs
app.use("/api/v1", authRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v1/bank", bankRouter);
app.use("/api/v1/restaurant", restaurantRouter);

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
