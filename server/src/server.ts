import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import allRoutes from "./routes";
import logger from "./utils/logger";
import connect from "./utils/connection";
import rateLimit from "express-rate-limit";
import express, { Application, NextFunction, Request, Response } from "express";
import { handleServerError } from "./utils/error";

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

// Error handling middleware
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  return handleServerError(res, error, `Error in ${method} ${url}`);
});

// Start server
const port = process.env.PORT || 8000;
app.listen(port, async () => {
  await connect();
  logger.info(`listening on port ${port}`);
});

export default app; // Export app to use in testing
