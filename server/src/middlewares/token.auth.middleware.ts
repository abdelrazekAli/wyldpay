import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// To avoid Property 'user' does not exist on type express Request error
declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

// Check token errors
const { TokenExpiredError } = jwt;
const catchExpireError = (err: any, res: Response) => {
  if (err instanceof TokenExpiredError)
    return res.status(403).send("Access Token was expired!");
  res.status(498).send("Invalid token.");
};

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");

  // Check if no token
  if (!token) return res.status(403).send("Access Denied. No token provided");

  // Verify token
  jwt.verify(token, process.env.JWT_TOKEN_SECRET!, (err: any, decode) => {
    if (err) return catchExpireError(err, res);

    // Decode token to user request and push next
    req.user = decode;
    next();
  });
};
