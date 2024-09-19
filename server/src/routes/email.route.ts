import logger from "../utils/logger";
import UserModel from "../models/user.model";
import TokenModel from "../models/token.model";
import { handleServerError } from "../utils/error";
import { Request, Response, Router } from "express";
import {
  generateRegisterToken,
  generateResetPassToken,
} from "../services/token.service";
import {
  sendRegistrationEmail,
  sendResetPassEmail,
} from "../utils/email/emailService";
import {
  validateEmail,
  validateSendResetPass,
} from "../utils/validation/user.validation";

export const emailRouter = Router();

// Send register token
emailRouter.post(
  "/send-register-token",
  async (req: Request, res: Response) => {
    try {
      // Validate req body
      let validationResult = validateEmail(req.body);
      if (validationResult) {
        logger.warn(
          `Invalid email validation: ${validationResult.details[0].message}`
        );
        return res.status(400).send(validationResult.details[0].message);
      }

      // Check if email is unique
      let emailCheck = await UserModel.findOne({ email: req.body.email });
      if (emailCheck) {
        logger.warn(`Email already used: ${req.body.email}`);
        return res.status(409).send("Email is already used");
      }

      // Generate register token
      const registerToken = generateRegisterToken({ email: req.body.email });
      sendRegistrationEmail(req.body.email, registerToken);

      // Response
      res.status(200).send("Register Email sent successfully");
    } catch (error: unknown) {
      return handleServerError(res, error, "Failed to send registration email");
    }
  }
);

// Send reset password link
emailRouter.post("/send-reset-token", async (req: Request, res: Response) => {
  try {
    // Validate req body
    let validationResult = validateSendResetPass(req.body);
    if (validationResult) {
      logger.warn(
        `Invalid reset password validation: ${validationResult.details[0].message}`
      );
      return res.status(400).send(validationResult.details[0].message);
    }

    // Check if email exists
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      logger.warn(`Email not registered: ${req.body.email}`);
      return res.status(401).send("Email is not registered yet");
    }

    // Create and assign a token
    let resetToken = generateResetPassToken({ _id: user._id });

    // Save reset token to database
    let newToken = new TokenModel({
      userId: user._id,
      token: resetToken,
    });
    await newToken.save();

    // Send reset token to user email
    sendResetPassEmail(String(user._id), user.email, resetToken);

    // Response
    res.status(200).send("Reset password Email sent successfully");
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to send reset password email");
  }
});
