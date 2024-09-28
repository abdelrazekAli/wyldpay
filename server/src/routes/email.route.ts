import { Router } from "express";
import {
  sendRegisterToken,
  sendResetToken,
} from "../controllers/email.controller";

export const emailRouter = Router();

// Send register token
emailRouter.post("/send-register-token", sendRegisterToken);

// Send reset password link
emailRouter.post("/send-reset-token", sendResetToken);
