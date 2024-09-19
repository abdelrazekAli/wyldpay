import logger from "./logger";
import { Response } from "express";

// Utility function to handle server error response
export const handleServerError = (
  res: Response,
  error: any,
  userMessage: string = "Internal server error",
  statusCode: number = 500
) => {
  logger.error(`${userMessage}: ${error.message || error}`);
  return res.status(statusCode).json(userMessage);
};

// Utility function to handle client error response
export const handleClientError = (
  res: Response,
  userMessage: string = "Invalid user data",
  statusCode: number = 400
) => {
  return res.status(statusCode).json(userMessage);
};
