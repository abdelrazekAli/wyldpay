import UserModel from "../models/user.model";
import { UserProps } from "../types/user.type";
import { handleServerError } from "../utils/error";
import { Request, Response, Router } from "express";
import { verifyAuth } from "../services/auth.service";
import { validateUserId } from "../utils/validation/Id.validation";
import { handleValidationError } from "../utils/validation/helper.validation";
import {
  validateUserData,
  validateUpdateUserLinks,
} from "../utils/validation/user.validation";

export const userRouter = Router();

// Get user by id
userRouter.get("/:userId", async (req: Request, res: Response) => {
  let user: UserProps;
  const { userId } = req.params;

  try {
    // Check user id
    const checkResult = await validateUserId(userId);
    if (typeof checkResult === "string") {
      return res.status(400).send(checkResult);
    } else {
      user = checkResult;
    }

    // Response
    return res.status(200).json(user);
  } catch (error: unknown) {
    return handleServerError(res, error, "Error fetching user by ID");
  }
});

// Update user by id
userRouter.put("/", verifyAuth, async (req: Request, res: Response) => {
  let user: UserProps;
  const userId = req.user._id;

  // Validate req body
  const validationResult = validateUserData(req.body);
  if (validationResult) return handleValidationError(res, validationResult);

  try {
    // Check user id
    const checkResult = await validateUserId(userId);
    if (typeof checkResult === "string") {
      return res.status(400).send(checkResult);
    } else {
      user = checkResult;
    }

    // Check email
    if (user.email !== req.body.email) {
      const emailCheck = await UserModel.findOne({ email: req.body.email });
      if (emailCheck) return res.status(409).json("Email is already in use");
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
});

// Update user social links by id
userRouter.put("/links/", verifyAuth, async (req: Request, res: Response) => {
  let user: UserProps;
  const userId = req.user._id;

  // Validate req body
  const validationResult = validateUpdateUserLinks(req.body);
  if (validationResult) return handleValidationError(res, validationResult);

  try {
    // Check user id
    const checkResult = await validateUserId(userId);
    if (typeof checkResult === "string") {
      return res.status(400).send(checkResult);
    } else {
      user = checkResult;
    }

    // Update user
    const updatedLinks = await UserModel.findByIdAndUpdate(
      userId,
      { socialLinks: req.body.socialLinks },
      { new: true }
    ).select("socialLinks");

    // Response
    return res.status(200).json(updatedLinks);
  } catch (error: unknown) {
    return handleServerError(res, error, "Error updating user social links");
  }
});
