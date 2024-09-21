import jwt from "jsonwebtoken";
import logger from "../config/logger.config";

// Generate JWT token
export const generateToken = (payload: object, expiresIn: string): string => {
  try {
    return jwt.sign(payload, process.env.JWT_TOKEN_SECRET!, { expiresIn });
  } catch (error: unknown) {
    logger.error(error);
    throw error;
  }
};

// Verify JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_TOKEN_SECRET!);
  } catch (error: unknown) {
    logger.error(error);
    throw error;
  }
};
