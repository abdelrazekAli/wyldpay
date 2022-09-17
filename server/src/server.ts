import "dotenv/config";
import cors from "cors";
import connect from "./utils/connect";
import express, { Application } from "express";
import { authRouter } from "./routes/auth.route";
import { paymentRouter } from "./routes/payment.route";

// Middlewares
const app: Application = express();
app.use(express.json());
app.use(cors());

// API for auth
app.use("/api/v1", authRouter);

// API for payment
app.use("/api/v1", paymentRouter);

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
