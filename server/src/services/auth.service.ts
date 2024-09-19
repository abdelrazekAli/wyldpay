import jwt from "jsonwebtoken";
import logger from "../utils/logger";
import { handleClientError } from "../utils/error";
import { Request, Response, NextFunction } from "express";
import { catchTokenErrors } from "../services/token.service";

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");

  // Check if no token
  if (!token) {
    return handleClientError(res, "Access Denied. No token provided.", 403);
  }

  // Verify token
  jwt.verify(
    token,
    process.env.JWT_TOKEN_SECRET as string,
    (error: any, decode) => {
      if (error) return catchTokenErrors(res, error);

      // Decode token to user request and push next
      req.user = decode;
      logger.info(
        `Token:${token} verified successfully and its decode:${decode}`
      );
      next();
    }
  );
};
