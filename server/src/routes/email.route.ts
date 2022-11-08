import { Router } from "express";
import { Request, Response } from "express";
import TokenModel from "../models/token.model";
import UserModel from "../models/user.model";
import { sendRegisterEmail, sendResetPassEmail } from "../utils/emails";
import { validateEmail, validateSendResetPass } from "../utils/validation";
import { generateRegisterToken, generateResetPassToken } from "../utils/token";

export const emailRouter = Router();

// Send register token
emailRouter.post(
  "/send-register-token",
  async (req: Request, res: Response) => {
    try {
      // Validate req body
      let validationResult = validateEmail(req.body);
      if (validationResult)
        return res.status(400).send(validationResult.details[0].message);

      // Check if email unique
      let emailCheck = await UserModel.findOne({ email: req.body.email });
      if (emailCheck) return res.status(409).send("email is already used");

      // Generate register token
      const registerToken = generateRegisterToken({ email: req.body.email });
      sendRegisterEmail(req.body.email, registerToken);

      // Response
      res.status(200).send("Register Email sent successfully");
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  }
);

// Send reset password link
emailRouter.post("/send-reset-token", async (req: Request, res: Response) => {
  try {
    // Validate req body
    let validationResult = validateSendResetPass(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Check if email exist
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("Email is not registered yet");

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
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
