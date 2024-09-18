import logger from "../utils/logger";
import UserModel from "../models/user.model";
import BankModel from "../models/bank.model";
import { BankProps } from "../types/bank.type";
import { Request, Response, Router } from "express";
import RestaurantModel from "../models/restaurant.model";
import { generateAccessToken } from "../services/token.service";
import { verifyAuth } from "../middlewares/token.auth.middleware";
import { validateUserId } from "../utils/validation/Id.validation";
import { validateBank } from "../utils/validation/bank.validation";
import { handleValidation } from "../utils/validation/helper.validation";
import { validatePaymentkeys } from "../utils/validation/payment.validation";

export const bankRouter = Router();

// Get bank by user id
bankRouter.get("/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    // Check user id
    const checkResult = (await validateUserId(userId)) as string | null;
    if (typeof checkResult === "string") {
      return res.status(400).send(checkResult);
    }

    // Get bank information
    const bank = (await BankModel.findOne({
      userId,
    }).select("-_id -userId")) as BankProps | null;

    if (!bank) {
      return res.status(404).json({ message: "Bank information not found" });
    }

    // Response
    return res.status(200).json(bank);
  } catch (err) {
    logger.error("Error fetching bank information by user ID", { error: err });
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Post new bank information
bankRouter.post("/", async (req: Request, res: Response) => {
  // Validate req body
  const validationResult = validateBank(req.body);
  const validationError = handleValidation(validationResult, res, 400);
  if (validationError) return validationError;

  try {
    // Create new bank
    const newBank = new BankModel(req.body);

    // Save bank
    const bank = (await newBank.save()) as BankProps;
    const user = await UserModel.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get user's restaurant information
    const restaurant = await RestaurantModel.findOne({
      userId: req.body.userId,
    }).select("_id currency");

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Create and assign a token
    const accessToken = generateAccessToken({
      _id: req.body.userId,
      restaurantId: restaurant._id,
    });

    // Set headers and response
    return res.header("auth-token", accessToken).json({
      _id: req.body.userId,
      firstName: user.firstName,
      email: user.email,
      restaurantId: restaurant._id,
      currency: restaurant.currency,
      accessToken: accessToken,
    });
  } catch (err) {
    logger.error("Error creating new bank information", { error: err });
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update bank information by user id
bankRouter.put("/", verifyAuth, async (req: Request, res: Response) => {
  const userId = req.user._id;

  // Validate req body
  const validationResult = validateBank(req.body);
  const validationError = handleValidation(validationResult, res, 400);
  if (validationError) return validationError;

  try {
    // Check user id
    const checkResult = (await validateUserId(userId)) as string | null;
    if (typeof checkResult === "string") {
      return res.status(400).send(checkResult);
    }

    // Update bank information
    const updateResult = await BankModel.updateOne(
      { userId },
      {
        $set: req.body,
      }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: "Bank information not found" });
    }

    // Response
    return res.status(200).json({ message: "Bank updated successfully" });
  } catch (err) {
    logger.error("Error updating bank information by user ID", { error: err });
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update payment methods by user id
bankRouter.put("/methods", verifyAuth, async (req: Request, res: Response) => {
  const userId = req.user._id;

  // Validate req body
  const validationResult = validatePaymentkeys(req.body);
  const validationError = handleValidation(validationResult, res, 400);
  if (validationError) return validationError;

  try {
    // Check user id
    const checkResult = (await validateUserId(userId)) as string | null;
    if (typeof checkResult === "string") {
      return res.status(400).send(checkResult);
    }

    // Update payment methods
    const updateResult = await BankModel.updateOne(
      { userId },
      {
        $set: {
          "paymentsMethods.$[elem].publicKey": req.body.publicKey,
          "paymentsMethods.$[elem].secretKey": req.body.secretKey,
        },
      },
      { arrayFilters: [{ "elem.name": req.body.name }] }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: "Payment method not found" });
    }

    // Response
    return res
      .status(200)
      .json({ message: "Payment methods updated successfully" });
  } catch (err) {
    logger.error("Error updating payment methods by user ID", { error: err });
    return res.status(500).json({ message: "Internal server error" });
  }
});
