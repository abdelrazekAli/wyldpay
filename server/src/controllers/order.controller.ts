import OrderModel from "../models/order.model";
import { Request, Response } from "express";
import { validateOrderData } from "../utils/validation/order.validation";
import { handleClientError, handleServerError } from "../utils/error.util";
import { handleValidationError } from "../utils/validation/helper.validation";

// Get order by id
export const getOrderById = async (req: Request, res: Response) => {
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
};

// Get all orders by restaurant id
export const getAllOrdersByRestaurantId = async (
  req: Request,
  res: Response
) => {
  const { restaurantId } = req.user;

  try {
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
};

// Post new order
export const createNewOrder = async (req: Request, res: Response) => {
  // Validate req body
  const { error, value: orderData } = validateOrderData(req.body);
  if (error) return handleValidationError(res, error);

  try {
    // Create new order
    const newOrder = new OrderModel(orderData);

    // Save order
    const order = await newOrder.save();

    // Response
    res.status(201).json(order);
  } catch (error: unknown) {
    return handleServerError(res, error, `Failed to create new order`);
  }
};
