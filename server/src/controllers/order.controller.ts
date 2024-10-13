import { Request, Response } from "express";
import {
  fetchOrderById,
  fetchOrdersByRestaurantID,
  createOrder,
  totalOrders,
} from "../services/order.service";
import { validateOrderData } from "../utils/validation/order.validation";
import { handleClientError, handleServerError } from "../utils/error.util";
import { handleValidationError } from "../utils/validation/helper.validation";

// Get order by id
export const getOrderById = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  try {
    const order = await fetchOrderById(orderId);
    if (!order) {
      return handleClientError(res, `Order not found with id: ${orderId}`, 404);
    }
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
export const getOrdersByRestaurantId = async (req: Request, res: Response) => {
  const { restaurantId } = req.user;
  const { page = 1, limit = 10 } = req.query; // For pagination

  try {
    const orders = await fetchOrdersByRestaurantID(restaurantId, +page, +limit);
    const totalRestaurantOrders = await totalOrders(restaurantId);
    const totalPages = Math.ceil(+totalRestaurantOrders / +limit);

    res.status(200).json({
      orders,
      totalPages,
    });
  } catch (error: unknown) {
    return handleServerError(
      res,
      error,
      `Failed to get orders for restaurant id: ${restaurantId}`
    );
  }
};

// Create a new order
export const createNewOrder = async (req: Request, res: Response) => {
  // Validate req body
  const { error, value: orderData } = validateOrderData(req.body);
  if (error) return handleValidationError(res, error);

  try {
    const order = await createOrder(orderData);
    res.status(201).json(order);
  } catch (error: unknown) {
    return handleServerError(res, error, `Failed to create new order`);
  }
};
