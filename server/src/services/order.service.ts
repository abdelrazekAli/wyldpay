import OrderModel from "../models/order.model";
import { OrderProps } from "../types/order.type";

// Get order by id
export const fetchOrderById = async (orderId: string) => {
  return (await OrderModel.findById(orderId)) as OrderProps | null;
};

// Get all orders by restaurant id
export const fetchAllOrdersByRestaurant = async (restaurantId: string) => {
  return (await OrderModel.find({ restId: restaurantId }, { __v: 0 }).sort({
    createdAt: -1,
  })) as OrderProps[] | [];
};

// Post new order
export const createOrder = async (orderData: OrderProps) => {
  const newOrder = new OrderModel(orderData);
  return await newOrder.save();
};
