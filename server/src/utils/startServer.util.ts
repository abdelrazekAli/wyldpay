import { Application } from "express";
import logger from "../config/logger.config";
import connectToDatabase from "../config/db.config";
import { connectToRedis } from "../config/redis.config";

// Function to start the server
export const startServer = async (app: Application) => {
  const port = process.env.PORT || 8000;

  try {
    // Start the server
    const server = app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });

    // Connect to main database
    await connectToDatabase();

    // Connect to caching database
    await connectToRedis();

    // Handle graceful shutdown
    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);

    return server;
  } catch (error) {
    logger.error("Error during startup", error);
    process.exit(1); // Exit if startup fails
  }
};

const shutdown = () => {
  logger.info("Gracefully shutting down server...");
  process.exit(0);
};
