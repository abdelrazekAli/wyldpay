import { Request, Response, Router } from "express";
import RestaurantModel from "../models/restaurant.model";
import { generateAccessToken } from "../services/token.service";
import { createStripeCustomer } from "../services/stripe.service";
import { deleteToken, findToken } from "../services/token.service";
import { comparePassword, hashPassword } from "../utils/password.util";
import { handleClientError, handleServerError } from "../utils/error.util";
import { handleValidationError } from "../utils/validation/helper.validation";
import {
  validateUserData,
  validateLoginData,
  validateResetPass,
} from "../utils/validation/user.validation";
import {
  createNewUser,
  findUserByEmail,
  findUserById,
} from "../services/user.service";

export const authRouter = Router();

// User register route
authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    // Validate register data
    const { error, value: userData } = validateUserData(req.body);
    if (error) return handleValidationError(res, error);

    // Check if email already exists
    const emailCheck = await findUserByEmail(userData.email);
    if (emailCheck) return handleClientError(res, "Email is already used", 409);

    // Create Stripe Customer
    const stripeCustomer = await createStripeCustomer(userData.email);

    // Create user
    const user = await createNewUser({
      ...userData,
      stripeCustomerId: stripeCustomer.id,
    });

    // Response
    res.status(200).json(user);
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to register user");
  }
});

// User login route
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    // Validate login data
    const { error, value: userData } = validateLoginData(req.body);
    if (error) return handleValidationError(res, error);

    // Find user by email
    const user = await findUserByEmail(userData.email);
    if (!user) return handleClientError(res, "Invalid email or password", 401);

    // Check password
    const validPassword = await comparePassword(
      userData.password,
      user.password
    );
    if (!validPassword)
      return handleClientError(res, "Invalid email or password", 401);

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
  } catch (error: unknown) {
    return handleServerError(res, error, "Login failed");
  }
});

// Reset password route
authRouter.post(
  "/pass/reset/:userId/:token",
  async (req: Request, res: Response) => {
    try {
      // Validate reset password data
      const { error, value: userData } = validateResetPass(req.body);
      if (error) return handleValidationError(res, error);

      // Find user by ID
      const user = await findUserById(req.params.userId);
      if (!user) return handleClientError(res, "User not found", 404);

      // Check token validity
      const token = await findToken(user._id, req.params.token);
      if (!user) return handleClientError(res, "Invalid link or expired", 401);

      // Update user password
      user.password = await hashPassword(userData.password);
      await user.save();

      // Remove token after reset
      await deleteToken(token._id);

      // Response
      res.status(200).send("Password reset successfully");
    } catch (error: unknown) {
      return handleServerError(res, error, "Password reset failed");
    }
  }
);
