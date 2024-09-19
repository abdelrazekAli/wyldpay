import OrderModel from "../models/order.model";
import { Request, Response, Router } from "express";
import { verifyAuth } from "../services/auth.service";
import { handleClientError, handleServerError } from "../utils/error";
import { validateOrderData } from "../utils/validation/order.validation";
import { validateRestaurantId } from "../utils/validation/Id.validation";
import { handleValidationError } from "../utils/validation/helper.validation";

export const orderRouter = Router();

// Get order by id
orderRouter.get("/:orderId", async (req: Request, res: Response) => {
  const { orderId } = req.params;

  try {
    // Find order
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return handleClientError(res, `Order not found with id: ${orderId}`, 404);
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
      return handleClientError(
        res,
        `restaurant id: ${restaurantId}, ${checkResult}`
      );
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
  let validationResult = validateOrderData(req.body);
  if (validationResult) return handleValidationError(res, validationResult);

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
