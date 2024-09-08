import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import allRoutes from "./routes";
import logger from "./utils/logger";
import connect from "./utils/connection";
import rateLimit from "express-rate-limit";
import express, { Application } from "express";

// Initialize Express app
const app: Application = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests
  message: "Too many requests from this IP, please try again after 15 minutes",
});

// Middlewares
app.use(express.json());
app.use(limiter);
app.use(helmet());
app.use(cors());

// API routes
app.use("/api/v1", allRoutes);

// Serve static files for production
app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: __dirname + "/client/build",
  });
});

// Error handling
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send("Something went wrong!");
});

// Start server
const port = process.env.PORT || 8000;
app.listen(port, async () => {
  await connect();
  logger.info(`listening on port ${port}`);
});

export default app; // Export app to use in testing
