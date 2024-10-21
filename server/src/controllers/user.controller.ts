import { Request, Response } from "express";
import { validateUserData } from "../utils/validation/user.validation";
import { handleClientError, handleServerError } from "../utils/error.util";
import { handleValidationError } from "../utils/validation/helper.validation";
import {
  findUserByEmail,
  findUserById,
  modifyUserById,
} from "../services/user.service";

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
  const { error, value: userData } = validateUserData(req.body, true);
  if (error) return handleValidationError(res, error);

  try {
    // Check if user exists
    const user = await findUserById(userId);
    if (!user)
      return handleClientError(res, `User with id ${userId} not found`, 404);

    // Check if the email is being updated
    const { email } = userData;
    if (email && email !== user.email) {
      const emailCheck = await findUserByEmail(userData.email);
      if (emailCheck)
        return handleClientError(res, "Email is already used", 409);
    }

    // Update user
    const updatedUser = await modifyUserById(userId, userData);

    // Response
    return res.status(200).json(updatedUser);
  } catch (error: unknown) {
    return handleServerError(res, error, "Error updating user by ID");
  }
};
