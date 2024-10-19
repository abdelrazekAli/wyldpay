import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import allRoutes from "./routes";
import responseTime from "response-time";
import mongoSanitize from "express-mongo-sanitize";
import { corsOptions } from "./config/cors.config";
import { startServer } from "./utils/startServer.util";
import { generalLimiter } from "./config/rateLimit.config";
import { logRequests } from "./middlewares/logger.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import express, { Application, Request, Response } from "express";

// Initialize Express app
const app: Application = express();
const { API_VERSION, NODE_ENV } = process.env;

// Middlewares
app.use(helmet()); // Secure app by setting various HTTP headers
app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(mongoSanitize()); // Sanitize data against NoSQL injection
app.use(generalLimiter); // Apply rate limiting
app.use(logRequests); // Log incoming requests
app.use(responseTime()); // Track response performance

// API Routes
app.use(API_VERSION, allRoutes);

// Serve static files for production
if (NODE_ENV === "production") {
  app.use(express.static("./client/build"));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile("index.html", { root: __dirname + "/client/build" });
  });
}

// Error handling middleware
app.use(errorHandler);

// Start the server unless running in test mode
if (NODE_ENV !== "test") {
  startServer(app);
}

// Export app for testing
export default app;
