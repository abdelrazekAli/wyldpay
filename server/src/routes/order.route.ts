import logger from "../utils/logger";
import OrderModel from "../models/order.model";
import { handleServerError } from "../utils/error";
import { Request, Response, Router } from "express";
import { verifyAuth } from "../services/auth.service";
import { validateOrder } from "../utils/validation/order.validation";
import { validateRestaurantId } from "../utils/validation/Id.validation";

export const orderRouter = Router();

// Get order by id
orderRouter.get("/:orderId", async (req: Request, res: Response) => {
  const { orderId } = req.params;

  try {
    // Find order
    const order = await OrderModel.findById(orderId);

    if (!order) {
      logger.warn(`Order not found with id: ${orderId}`);
      return res.status(404).send("Order not found");
    }

    // Response
    res.status(200).json(order);
  } catch (error: unknown) {
    return handleServerError(
      res,
      error,
      `Failed to get order by id: ${orderId}`
    );
  }
});

// Get all orders by restaurant id
orderRouter.get("/", verifyAuth, async (req: Request, res: Response) => {
  const { restaurantId } = req.user;

  try {
    // Check restaurant id
    const checkResult = (await validateRestaurantId(restaurantId)) as
      | string
      | null;
    if (typeof checkResult === "string") {
      logger.warn(
        `Invalid restaurant id: ${restaurantId}, Error: ${checkResult}`
      );
      return res.status(400).send(checkResult);
    }

    // Find orders
    const orders = await OrderModel.find(
      { restId: restaurantId },
      { __v: 0 }
    ).sort({ createdAt: -1 });

    // Response
    res.status(200).json(orders);
  } catch (error: unknown) {
    return handleServerError(
      res,
      error,
      `Failed to get orders for restaurant id: ${restaurantId}`
    );
  }
});

// Post new order
orderRouter.post("/", async (req: Request, res: Response) => {
  // Validate req body
  let validationResult = validateOrder(req.body);
  if (validationResult) {
    logger.warn(`Invalid order data: ${validationResult.details[0].message}`);
    return res.status(400).send(validationResult.details[0].message);
  }

  try {
    // Create new order
    const newOrder = new OrderModel(req.body);

    // Save order
    const order = await newOrder.save();

    // Response
    res.status(201).json(order);
  } catch (error: unknown) {
    return handleServerError(res, error, `Failed to create new order`);
  }
});
