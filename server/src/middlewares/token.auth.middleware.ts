import jwt from "jsonwebtoken";
import logger from "../utils/logger";
import { Request, Response, NextFunction } from "express";

const { TokenExpiredError, JsonWebTokenError } = jwt;

// Check token errors
const catchTokenErrors = (err: any, res: Response) => {
  if (err instanceof TokenExpiredError) {
    logger.error("Access Token was expired!");
    return res.status(403).json({ message: "Access Token was expired!" });
  } else if (err instanceof JsonWebTokenError) {
    logger.error("Invalid token.");
    return res.status(498).json({ message: "Invalid token." });
  }
  logger.error("An unknown error occurred.");
  return res.status(500).json({ message: "An unknown error occurred." });
};

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");

  // Check if no token
  if (!token) {
    logger.warn("Access Denied. No token provided");
    return res
      .status(403)
      .json({ message: "Access Denied. No token provided" });
  }

  // Verify token
  jwt.verify(
    token,
    process.env.JWT_TOKEN_SECRET as string,
    (err: any, decode) => {
      if (err) return catchTokenErrors(err, res);

      // Decode token to user request and push next
      req.user = decode;
      logger.info("Token verified successfully");
      next();
    }
  );
};
