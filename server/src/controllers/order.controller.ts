import { Request, Response } from "express";
import {
  fetchOrderById,
  fetchAllOrdersByRestaurant,
  createOrder,
} from "../services/order.service";
import { validateOrderData } from "../utils/validation/order.validation";
import { handleClientError, handleServerError } from "../utils/error.util";
import { handleValidationError } from "../utils/validation/helper.validation";

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

export const getAllOrdersByRestaurantId = async (
  req: Request,
  res: Response
) => {
  const { restaurantId } = req.user;

  try {
    const orders = await fetchAllOrdersByRestaurant(restaurantId);
    res.status(200).json(orders);
  } catch (error: unknown) {
    return handleServerError(
      res,
      error,
      `Failed to get orders for restaurant id: ${restaurantId}`
    );
  }
};

export const createNewOrder = async (req: Request, res: Response) => {
  try {
    // Validate req body
    const { error, value: orderData } = validateOrderData(req.body);
    if (error) throw handleValidationError(res, error);

    const order = await createOrder(orderData);
    res.status(201).json(order);
  } catch (error: unknown) {
    return handleServerError(res, error, `Failed to create new order`);
  }
};
