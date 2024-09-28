import { Router } from "express";
import { verifyAuth } from "../middlewares/verifyAuth.middleware";
import { validateIdMiddleware } from "../middlewares/validateId.middleware";
import {
  getOrderById,
  getAllOrdersByRestaurantId,
  createNewOrder,
} from "../controllers/order.controller";

export const orderRouter = Router();

// Get order by id
orderRouter.get("/:orderId", validateIdMiddleware("orderId"), getOrderById);

// Get all orders by restaurant id
orderRouter.get("/", verifyAuth, getAllOrdersByRestaurantId);

// Post new order
orderRouter.post("/", createNewOrder);
