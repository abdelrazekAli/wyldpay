import { Router } from "express";
import { verifyAuth } from "../middlewares/verifyAuth.middleware";
import { validateIdMiddleware } from "../middlewares/validateId.middleware";
import {
  getRestaurantById,
  getRestaurantByUserId,
  postRestaurant,
  getRestaurantCategories,
  updateRestaurant,
  updateCategories,
} from "../controllers/restaurant.controller";

export const restaurantRouter = Router();

// Get restaurant by restaurant ID
restaurantRouter.get(
  "/:restaurantId",
  validateIdMiddleware("restaurantId"),
  getRestaurantById
);

// Get restaurant by user ID
restaurantRouter.get(
  "/user/:userId",
  validateIdMiddleware("userId"),
  getRestaurantByUserId
);

// Post new restaurant
restaurantRouter.post("/", postRestaurant);

// Get restaurant categories
restaurantRouter.get(
  "/categories/:restaurantId",
  validateIdMiddleware("restaurantId"),
  getRestaurantCategories
);

// Update restaurant data
restaurantRouter.put("/", verifyAuth, updateRestaurant);

// Update restaurant categories
restaurantRouter.put("/categories", verifyAuth, updateCategories);
