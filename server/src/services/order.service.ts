import OrderModel from "../models/order.model";
import { OrderProps } from "../types/order.type";
import {
  deleteCachedValue,
  getCachedValue,
  setCacheValue,
} from "./cache.service";

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
  const cacheKey = `restaurant:${restaurantId}:orders:page:${page}`;

  // Check if the data is in cache
  const cachedOrders = await getCachedValue(cacheKey);
  if (cachedOrders) {
    return JSON.parse(cachedOrders) as OrderProps[];
  }

  // If not in cache, fetch from the database
  const orders: OrderProps[] | [] = await OrderModel.find(
    { restId: restaurantId },
    { __v: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  // Cache the items for future requests
  await setCacheValue(cacheKey, JSON.stringify(orders));

  return orders;
};

// Post new order
export const createOrder = async (orderData: OrderProps) => {
  const newOrder = new OrderModel(orderData);
  const order = await newOrder.save();

  // Invalidate cache for orders by restaurant ID
  const cacheKey = `restaurant:${order.restId}:orders:page:1`;
  await deleteCachedValue(cacheKey);

  return order;
};

// Count total orders number
export const totalOrders = async (restaurantId: string) => {
  return await OrderModel.countDocuments({ restId: restaurantId });
};
