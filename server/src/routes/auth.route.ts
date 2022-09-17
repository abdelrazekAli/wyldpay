import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { generateToken } from "../utils/token";
import ResetTokenModel from "../models/resetToken.model";
import RefreshTokenModel from "../models/refreshToken.model";
import {
  validateLogin,
  validateResetPass,
  validateSendResetPass,
  validateUser,
} from "../utils/validation";

export const authRouter = Router();

// Register
authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    // Validate req body
    let validationResult = validateUser(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Check if email unique
    let emailCheck = await UserModel.findOne({ email: req.body.email });
    if (emailCheck) return res.status(409).send("email is already used");

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new UserModel({ ...req.body, password: hashedPassword });

    // Save user
    const user = await newUser.save();

    // Response
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    // Validate req body
    let validationResult = validateLogin(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Check if email exist
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("Invalid email or password");

    // Check if password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send("Invalid email or password");

    // Create and assign a token
    let accessToken = generateToken({ _id: user._id });
    let refreshToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_TOKEN_SECRET!
    );

    // Save refresh token to database
    let newToken = new RefreshTokenModel({
      token: refreshToken,
    });
    await newToken.save();

    // Set headers and response
    res.header("auth-token", accessToken).json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Send reset password link
authRouter.post("/pass/send-reset", async (req: Request, res: Response) => {
  try {
    // Validate req body
    let validationResult = validateSendResetPass(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Check if email exist
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("Email is not registered yet");

    // Create and assign a token
    let resetToken = generateToken({ _id: user._id });

    // Save reset token to database
    let newToken = new ResetTokenModel({
      userId: user._id,
      token: resetToken,
    });
    await newToken.save();

    // Response
    res.status(200).json({
      _id: user._id,
      token: resetToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Reset password
authRouter.post(
  "/pass/reset/:userId/:token",
  async (req: Request, res: Response) => {
    try {
      // Validate req body
      let validationResult = validateResetPass(req.body);
      if (validationResult)
        return res.status(400).send(validationResult.details[0].message);

      // Check if email exist
      const user = await UserModel.findById(req.params.userId);
      if (!user) return res.status(401).send("Invalid link or expired");

      // Check if token vaild
      const token = await ResetTokenModel.findOne({
        userId: user._id,
        token: req.params.token,
      });
      if (!token) return res.status(401).send("Invalid link or expired");

      // Encrypt new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Update user
      user.password = hashedPassword;
      await user.save();
      await token.delete();

      // Response
      res.status(200).send("Password reset succssfully");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);
