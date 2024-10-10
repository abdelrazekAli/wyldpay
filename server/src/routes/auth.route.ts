import { Router } from "express";
import {
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/auth.controller";
import { authLimiter } from "../config/rateLimit.config";
import { validateIdMiddleware } from "../middlewares/validateId.middleware";

export const authRouter = Router();

// User register route
authRouter.post("/register", authLimiter, registerUser);

// User login route
authRouter.post("/login", authLimiter, loginUser);

// Reset password route
authRouter.post(
  "/pass/reset/:userId/:token",
  validateIdMiddleware("userId"),
  resetPassword
);
