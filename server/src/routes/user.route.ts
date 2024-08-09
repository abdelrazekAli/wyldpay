import logger from "../utils/logger";
import UserModel from "../models/user.model";
import { UserProps } from "../types/user.type";
import { Request, Response, Router } from "express";
import { verifyAuth } from "../middlewares/token.auth.middleware";
import { validateUserId } from "../utils/validation/Id.validation";
import { handleValidation } from "../utils/validation/validationHelper";
import {
  validateUser,
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
  } catch (err) {
    logger.error("Error fetching user by ID", { error: err });
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update user by id
userRouter.put("/", verifyAuth, async (req: Request, res: Response) => {
  let user: UserProps;
  const userId = req.user._id;

  // Validate req body
  const validationResult = validateUser(req.body);
  const validationError = handleValidation(validationResult, res, 400);
  if (validationError) return validationError;

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
  } catch (err) {
    logger.error("Error updating user by ID", { error: err });
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update user social links by id
userRouter.put("/links/", verifyAuth, async (req: Request, res: Response) => {
  let user: UserProps;
  const userId = req.user._id;

  // Validate req body
  const validationResult = validateUpdateUserLinks(req.body);
  const validationError = handleValidation(validationResult, res, 400);
  if (validationError) return validationError;

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
  } catch (err) {
    logger.error("Error updating user social links", { error: err });
    return res.status(500).json({ message: "Internal server error" });
  }
});
