import RestaurantModel from "../models/restaurant.model";
import { RestaurantProps } from "../types/restaurant.type";

// Find restaurant by ID
export const findRestaurantById = async (
  id: string
): Promise<(RestaurantProps & Document) | null> => {
  return await RestaurantModel.findById(id);
};

// Find restaurant by user ID
export const findRestaurantByUserId = async (userId: string) => {
  return await RestaurantModel.findOne({ userId }, { __v: 0 }).populate({
    path: "userId",
    select: "-_id -password -updatedAt -createdAt -__v",
  });
};

// Create a new restaurant
export const createRestaurant = async (restaurantData: RestaurantProps) => {
  const newRestaurant = new RestaurantModel(restaurantData);
  return await newRestaurant.save();
};

// Update restaurant by ID
export const updateRestaurantById = async (
  restaurantId: string,
  updateData: Partial<RestaurantProps>
) => {
  return await RestaurantModel.updateOne(
    { _id: restaurantId },
    { $set: updateData }
  );
};

// Update restaurant categories by ID
export const updateRestaurantCategories = async (
  restaurantId: string,
  categories: string[]
) => {
  return await RestaurantModel.findByIdAndUpdate(
    restaurantId,
    { categories },
    { new: true }
  );
};
