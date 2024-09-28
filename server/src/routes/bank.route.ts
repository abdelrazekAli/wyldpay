import { Router } from "express";
import { verifyAuth } from "../middlewares/verifyAuth.middleware";
import { validateIdMiddleware } from "../middlewares/validateId.middleware";
import {
  getBankByUserIdController,
  createBankController,
  updateBankInfoController,
  updatePaymentMethodsController,
} from "../controllers/bank.controller";

export const bankRouter = Router();

// Get bank by user ID
bankRouter.get(
  "/:userId",
  validateIdMiddleware("userId"),
  getBankByUserIdController
);

// Post new bank information
bankRouter.post("/", createBankController);

// Update bank information by user ID
bankRouter.put("/", verifyAuth, updateBankInfoController);

// Update payment methods by user ID
bankRouter.put("/methods", verifyAuth, updatePaymentMethodsController);
