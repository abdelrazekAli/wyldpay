import logger from "../config/logger.config";
import { verifyToken } from "../utils/token.util";
import { handleClientError } from "../utils/error";
import { Request, Response, NextFunction } from "express";
import { catchTokenErrors } from "../services/token.service";

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");

  // Check if no token
  if (!token) {
    return handleClientError(res, "Access Denied. No token provided.", 403);
  }

  // Verify token using the utility function
  try {
    const decode = verifyToken(token);
    req.user = decode; // Attach decoded token data to the request
    logger.info(
      `Token:${token} verified successfully and its decode:${JSON.stringify(
        decode
      )}`
    );
    next();
  } catch (error) {
    catchTokenErrors(res, error); // Handle token errors
  }
};
