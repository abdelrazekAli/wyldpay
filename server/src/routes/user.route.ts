import { Router } from "express";
import { getUserById, updateUser } from "../controllers/user.controller";
import { verifyAuth } from "../middlewares/verifyAuth.middleware";
import { validateIdMiddleware } from "../middlewares/validateId.middleware";

export const userRouter = Router();

// Get user by id
userRouter.get("/:userId", validateIdMiddleware("userId"), getUserById);

// Update user by id
userRouter.patch("/", verifyAuth, updateUser);
