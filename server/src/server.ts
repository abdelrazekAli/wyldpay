import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import allRoutes from "./routes";
import responseTime from "response-time";
import logger from "./config/logger.config";
import express, { Application } from "express";
import connectToDatabase from "./config/db.config";
import { corsOptions } from "./config/cors.config";
import { generalLimiter } from "./config/rateLimit.config";
import { logRequest } from "./middlewares/logger.middleware";
import { errorHandler } from "./middlewares/error.middleware";

// Initialize Express app
const app: Application = express();

// Middlewares
app.use(express.json());
app.use(generalLimiter);
app.use(helmet());
app.use(cors(corsOptions));
app.use(responseTime());

// Middleware to log each incoming request
app.use(logRequest);

// API routes
app.use("/api/v1", allRoutes);

// Serve static files for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root: __dirname + "/client/build" });
  });
}

// Error handling middleware
app.use(errorHandler);

// Start server
const port = process.env.PORT;
app.listen(port, async () => {
  await connectToDatabase();
  logger.info(`listening on port ${port}`);
});

// Export app for testing
export default app;
