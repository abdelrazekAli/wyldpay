import { Router } from "express";
import {
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/auth.controller";

export const authRouter = Router();

// User register route
authRouter.post("/register", registerUser);

// User login route
authRouter.post("/login", loginUser);

// Reset password route
authRouter.post("/pass/reset/:userId/:token", resetPassword);
