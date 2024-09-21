import logger from "../config/logger.config";
import { handleServerError } from "../utils/error";
import { Request, Response, NextFunction } from "express";

// Error handling middleware
export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url } = req;

  // Log the error with request details
  logger.error(`Error occurred in ${method} ${url}: ${error}`);

  // Handle the error response
  return handleServerError(res, error, `Error in ${method} ${url}`);
};
