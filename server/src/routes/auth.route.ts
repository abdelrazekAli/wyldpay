import logger from "../utils/logger";
import { Request, Response, Router } from "express";
import RestaurantModel from "../models/restaurant.model";
import { generateAccessToken } from "../services/token.service";
import { createStripeCustomer } from "../services/stripe.service";
import { comparePassword, hashPassword } from "../utils/password";
import { deleteToken, findToken } from "../services/token.service";
import { handleValidation } from "../utils/validation/helper.validation";
import {
  validateUserData,
  validateLoginData,
  validateResetPass,
} from "../utils/validation/user.validation";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../services/user.service";

export const authRouter = Router();

// User register route
authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    // Validate user input
    let validationResult = validateUserData(req.body);
    if (validationResult) {
      return handleValidation(validationResult, res, 400);
    }

    // Check if email already exists
    const emailCheck = await findUserByEmail(req.body.email);
    if (emailCheck) return res.status(409).send("email is already used");

    // Create Stripe Customer
    const stripeCustomer = await createStripeCustomer(req.body.email);

    // Create user
    const user = await createUser({
      ...req.body,
      stripeCustomerId: stripeCustomer.id,
    });

    // Response
    res.status(200).json(user);
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
});

// User login route
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    // Validate login input
    const validationResult = validateLoginData(req.body);
    if (validationResult) return res.status(400).send(validationResult);

    // Find user by email
    const user = await findUserByEmail(req.body.email);
    if (!user) return res.status(401).send("Invalid email or password");

    // Check password
    const validPassword = await comparePassword(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send("Invalid email or password");

    // Get restaurant details
    const restaurant = await RestaurantModel.findOne({
      userId: user._id,
    }).select("_id currency");

    // Generate Access Token
    const accessToken = generateAccessToken({
      _id: user._id,
      restaurantId: restaurant?._id,
    });

    // Response
    res.header("auth-token", accessToken).json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      restaurantId: restaurant?._id,
      currency: restaurant?.currency,
      accessToken,
    });
  } catch (err) {
    logger.error(err);
    res.status(500).json(err);
  }
});

// Reset password route
authRouter.post(
  "/pass/reset/:userId/:token",
  async (req: Request, res: Response) => {
    try {
      // Validate reset input
      const validationResult = validateResetPass(req.body);
      if (validationResult) return res.status(400).send(validationResult);

      // Find user by ID
      const user = await findUserById(req.params.userId);
      if (!user) return res.status(401).send("Invalid link or expired");

      // Check token validity
      const token = await findToken(user._id, req.params.token);
      if (!token) return res.status(401).send("Invalid link or expired");

      // Update user password
      user.password = await hashPassword(req.body.password);
      await user.save();

      // Remove token after reset
      await deleteToken(token._id);

      // Response
      res.status(200).send("Password reset successfully");
    } catch (err) {
      logger.error(err);
      res.status(500).json(err);
    }
  }
);
