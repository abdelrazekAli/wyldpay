import UserModel from "../models/user.model";
import TokenModel from "../models/token.model";
import { Request, Response, Router } from "express";
import { findUserByEmail } from "../services/user.service";
import { handleClientError, handleServerError } from "../utils/error.util";
import { handleValidationError } from "../utils/validation/helper.validation";
import {
  generateRegisterToken,
  generateResetPassToken,
} from "../services/token.service";

import {
  validateEmail,
  validateSendResetPass,
} from "../utils/validation/user.validation";
import {
  sendRegistrationEmail,
  sendResetPassEmail,
} from "../services/mail.service";

export const emailRouter = Router();

// Send register token
emailRouter.post(
  "/send-register-token",
  async (req: Request, res: Response) => {
    try {
      // Validate req body
      const { error, value: data } = validateEmail(req.body);
      if (error) return handleValidationError(res, error);

      // Check if email already exists
      const emailCheck = await findUserByEmail(data.email);
      if (emailCheck)
        return handleClientError(res, "Email is already used", 409);

      // Generate register token
      const registerToken = generateRegisterToken({ email: data.email });
      await sendRegistrationEmail(data.email, registerToken);

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
    const { error, value: data } = validateSendResetPass(req.body);
    if (error) return handleValidationError(res, error);

    // Check if email exists
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      return handleClientError(res, `Email not registered: ${data.email}`, 401);
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
    await sendResetPassEmail(String(user._id), user.email, resetToken);

    // Response
    res.status(200).send("Reset password Email sent successfully");
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to send reset password email");
  }
});
