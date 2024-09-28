import { Router } from "express";
import {
  getUserById,
  updateUser,
  updateUserLinks,
} from "../controllers/user.controller";
import { validateIdMiddleware } from "../middlewares/validateId.middleware";
import { verifyAuth } from "../middlewares/verifyAuth.middleware";

export const userRouter = Router();

// Get user by id
userRouter.get("/:userId", validateIdMiddleware("userId"), getUserById);

// Update user by id
userRouter.put("/", verifyAuth, updateUser);

// Update user social links by id
userRouter.put("/links/", verifyAuth, updateUserLinks);
