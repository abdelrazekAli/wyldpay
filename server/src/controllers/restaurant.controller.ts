import { Request, Response } from "express";
import { handleClientError, handleServerError } from "../utils/error.util";
import { handleValidationError } from "../utils/validation/helper.validation";
import {
  validateRestaurantData,
  validateRestaurantUpdate,
  validateCategories,
} from "../utils/validation/restaurant.validation";
import {
  findRestaurantByUserId,
  createRestaurant,
  updateRestaurantById,
  updateRestaurantCategories,
  findRestaurantById,
} from "../services/restaurant.service";

// Get restaurant by ID
export const getRestaurantById = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  try {
    const restaurant = await findRestaurantById(restaurantId);
    if (!restaurant) {
      return handleClientError(
        res,
        `Restaurant with id ${restaurantId} not found`,
        404
      );
    }

    return res.status(200).json(restaurant);
  } catch (error: unknown) {
    handleServerError(res, error, "Failed to get restaurant by ID");
  }
};

// Get restaurant by user ID
export const getRestaurantByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const restaurant = await findRestaurantByUserId(userId);
    return res.status(200).json(restaurant);
  } catch (error: unknown) {
    handleServerError(res, error, "Failed to get restaurant by user ID");
  }
};

// Post a new restaurant
export const postRestaurant = async (req: Request, res: Response) => {
  // Validate req body
  const { error, value: restaurantData } = validateRestaurantData(req.body);
  if (error) return handleValidationError(res, error);

  try {
    const restaurant = await createRestaurant(restaurantData);
    return res.status(201).json(restaurant);
  } catch (error: unknown) {
    handleServerError(res, error, "Failed to create new restaurant");
  }
};

// Get restaurant categories
export const getRestaurantCategories = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  try {
    const restaurant = await findRestaurantById(restaurantId);
    if (!restaurant) {
      return handleClientError(
        res,
        `Restaurant with id ${restaurantId} not found`,
        404
      );
    }

    return res.status(200).json(restaurant.categories);
  } catch (error: unknown) {
    handleServerError(res, error, "Failed to get restaurant categories");
  }
};

// Update restaurant data
export const updateRestaurant = async (req: Request, res: Response) => {
  const { restaurantId } = req.user;

  // Validate req body
  const { error, value: restaurantData } = validateRestaurantUpdate(req.body);
  if (error) return handleValidationError(res, error);

  try {
    await updateRestaurantById(restaurantId, restaurantData);
    return res.status(200).json("Restaurant updated successfully");
  } catch (error: unknown) {
    handleServerError(res, error, "Failed to update restaurant");
  }
};

// Update restaurant categories
export const updateCategories = async (req: Request, res: Response) => {
  // Validate req body
  const { error, value: categoriesData } = validateCategories(req.body);
  if (error) return handleValidationError(res, error);

  try {
    const restaurant = await updateRestaurantCategories(
      categoriesData.restaurantId,
      categoriesData.categories
    );
    return res.status(200).json(restaurant);
  } catch (error: unknown) {
    handleServerError(res, error, "Failed to update restaurant categories");
  }
};
