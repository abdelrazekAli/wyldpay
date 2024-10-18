import { handleServerError } from "../utils/error.util";
import { Request, Response, NextFunction } from "express";

// Error handling middleware
export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url } = req;

  // Handle the error response
  return handleServerError(res, error, `Error in ${method} ${url}`);
};
