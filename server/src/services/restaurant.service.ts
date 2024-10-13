import RestaurantModel from "../models/restaurant.model";
import { RestaurantProps } from "../types/restaurant.type";

// Find restaurant
export const findRestaurant = async (filter: object) => {
  return await RestaurantModel.findOne(filter).populate(
    "userId",
    "-password -createdAt -updatedAt -__v"
  );
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
