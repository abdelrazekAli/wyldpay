import { Router } from "express";
import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { sendRegisterEmail } from "../utils/email";
import { validateEmail } from "../utils/validation";
import { generateRegisterToken } from "../utils/token";

export const emailRouter = Router();

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
      res.status(200).send("Email sent successfully");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);
