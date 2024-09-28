import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { UserProps } from "../types/user.type";
import { findUserByEmail, findUserById } from "../services/user.service";
import { handleClientError, handleServerError } from "../utils/error.util";
import { handleValidationError } from "../utils/validation/helper.validation";
import {
  validateUserData,
  validateUpdateUserLinks,
} from "../utils/validation/user.validation";

// Get user by id
export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await findUserById(userId);
    if (!user)
      return handleClientError(res, `User with id ${userId} not found`, 404);

    // Response
    return res.status(200).json(user);
  } catch (error: unknown) {
    return handleServerError(res, error, "Error fetching user by ID");
  }
};

// Update user by id
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.user._id;

  // Validate req body
  const { error, value: userData } = validateUserData(req.body);
  if (error) return handleValidationError(res, error);

  try {
    // Check if user exists
    const user = await findUserById(userId);
    if (!user)
      return handleClientError(res, `User with id ${userId} not found`, 404);

    // Check if the email is changing and if the new email is already in use
    if (user.email !== req.body.email) {
      const emailCheck = await findUserByEmail(userData.email);
      if (emailCheck)
        return handleClientError(res, "Email is already used", 409);
    }

    // Update user
    const updatedUser = (await UserModel.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    ).select("-password -createdAt -updatedAt")) as UserProps;

    // Response
    return res.status(200).json(updatedUser);
  } catch (error: unknown) {
    return handleServerError(res, error, "Error updating user by ID");
  }
};

// Update user social links by id
export const updateUserLinks = async (req: Request, res: Response) => {
  const userId = req.user._id;

  // Validate req body
  const { error, value: userData } = validateUpdateUserLinks(req.body);
  if (error) return handleValidationError(res, error);

  try {
    // Update user social links
    const updatedLinks = await UserModel.findByIdAndUpdate(
      userId,
      { socialLinks: userData.socialLinks },
      { new: true }
    ).select("socialLinks");

    // Response
    return res.status(200).json(updatedLinks);
  } catch (error: unknown) {
    return handleServerError(res, error, "Error updating user social links");
  }
};
