import { Request, Response, NextFunction } from "express";
import logger from "../config/logger.config";

// Middleware to log each incoming requests and the responses
export const logRequests = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url, headers } = req;
  const clientIP = req.ip;

  // Log incoming request details
  logger.info(
    `Request: ${method} ${url} - IP: ${clientIP} - Headers: ${JSON.stringify(
      headers
    )}`
  );

  // Log response details after response is finished
  res.on("finish", () => {
    const { statusCode } = res;
    const responseTime = res.get("X-Response-Time") || "Unknown";
    logger.info(
      `Response: ${method} ${url} - Status: ${statusCode} - Time: ${responseTime}`
    );
  });

  next(); // Proceed to the next middleware
};
