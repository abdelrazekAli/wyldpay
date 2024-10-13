import { number } from "joi";
import OrderModel from "../models/order.model";
import { OrderProps } from "../types/order.type";

// Get order by id
export const fetchOrderById = async (orderId: string) => {
  return (await OrderModel.findById(orderId)) as OrderProps | null;
};

// Get all orders by restaurant id
export const fetchOrdersByRestaurantID = async (
  restaurantId: string,
  page: number,
  limit: number
) => {
  const skip = (page - 1) * limit; // Calculate how many documents to skip for pagination

  return (await OrderModel.find({ restId: restaurantId }, { __v: 0 })
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit)) as OrderProps[] | [];
};

// Count total orders number
export const totalOrders = async (restaurantId: string) => {
  return await OrderModel.countDocuments({ restId: restaurantId });
};

// Post new order
export const createOrder = async (orderData: OrderProps) => {
  const newOrder = new OrderModel(orderData);
  return await newOrder.save();
};
