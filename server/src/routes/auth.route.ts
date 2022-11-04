import bcrypt from "bcrypt";
import { Router } from "express";
import { stripe } from "../utils/stripe";
import { Request, Response } from "express";
import UserModel from "../models/user.model";
import TokenModel from "../models/token.model";
import { generateAccessToken } from "../utils/token";
import RestaurantModel from "../models/restaurant.model";
import {
  validateUser,
  validateLogin,
  validateResetPass,
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

    const stripeCustomer = await stripe.customers.create(
      {
        email: req.body.email,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );

    // Create new user
    const newUser = new UserModel({
      ...req.body,
      password: hashedPassword,
      stripeCustomerId: stripeCustomer.id,
    });

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

    // Get user restaurant id
    const restaurant = await RestaurantModel.findOne({
      userId: user._id,
    }).select("_id currency");

    // Create and assign a token
    let accessToken = generateAccessToken({
      _id: user._id,
      restaurantId: restaurant?._id,
    });

    // Set headers and response
    res.header("auth-token", accessToken).json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      restaurantId: restaurant?._id,
      currency: restaurant?.currency,
      accessToken: accessToken,
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
      if (!user) return res.status(401).send("Invalid link or expired.");

      // Check if token vaild
      const token = await TokenModel.findOne({
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
