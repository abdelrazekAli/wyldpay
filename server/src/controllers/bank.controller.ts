import { Request, Response } from "express";
import { handleServerError } from "../utils/error.util";
import { generateAccessToken } from "../services/token.service";
import { validateBankData } from "../utils/validation/bank.validation";
import { validatePaymentkeys } from "../utils/validation/payment.validation";
import { handleValidationError } from "../utils/validation/helper.validation";
import {
  getBankByUserId,
  createBank,
  getUserAndRestaurantData,
  updateBankInfo,
  updatePaymentMethods,
} from "../services/bank.service";

// Get bank by user ID
export const getBankByUserIdController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params;

  try {
    // Fetch bank data
    const bank = await getBankByUserId(userId);

    // Response
    return res.status(200).json(bank);
  } catch (error: unknown) {
    return handleServerError(
      res,
      error,
      `Error fetching bank information for user ID: ${userId}`
    );
  }
};

// Post new bank information
export const createBankController = async (req: Request, res: Response) => {
  // Validate request body
  const { error, value: bankData } = validateBankData(req.body);
  if (error) return handleValidationError(res, error);

  try {
    // Create new bank
    await createBank(bankData);

    // Fetch user and restaurant data
    const { user, restaurant } = await getUserAndRestaurantData(
      bankData.userId
    );

    // Generate access token
    const accessToken = generateAccessToken({
      _id: bankData.userId,
      restaurantId: restaurant._id,
    });

    // Response
    return res.header("auth-token", accessToken).json({
      _id: bankData.userId,
      firstName: user.firstName,
      email: user.email,
      restaurantId: restaurant._id,
      currency: restaurant.currency,
      accessToken,
    });
  } catch (error: unknown) {
    return handleServerError(res, error, "Error creating new bank information");
  }
};

// Update bank information by user ID
export const updateBankInfoController = async (req: Request, res: Response) => {
  const userId = req.user._id;

  // Validate request body
  const { error, value: bankData } = validateBankData(req.body);
  if (error) return handleValidationError(res, error);

  try {
    // Update bank info
    await updateBankInfo(userId, bankData);

    // Response
    return res.status(200).json({ message: "Bank updated successfully" });
  } catch (error: unknown) {
    return handleServerError(res, error, "Error updating bank information");
  }
};

// Update payment methods by user ID
export const updatePaymentMethodsController = async (
  req: Request,
  res: Response
) => {
  const userId = req.user._id;

  // Validate request body
  const { error, value: paymentsData } = validatePaymentkeys(req.body);
  if (error) return handleValidationError(res, error);

  try {
    // Update payment methods
    await updatePaymentMethods(userId, paymentsData);

    // Response
    return res
      .status(200)
      .json({ message: "Payment methods updated successfully" });
  } catch (error: unknown) {
    return handleServerError(res, error, "Error updating payment methods");
  }
};
