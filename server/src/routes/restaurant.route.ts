import logger from "../utils/logger";
import { handleServerError } from "../utils/error";
import { Request, Response, Router } from "express";
import { verifyAuth } from "../services/auth.service";
import RestaurantModel from "../models/restaurant.model";
import { RestaurantProps } from "../types/restaurant.type";
import { handleValidationError } from "../utils/validation/helper.validation";
import {
  validateRestaurantId,
  validateUserId,
} from "../utils/validation/Id.validation";
import {
  validateCategories,
  validateRestaurant,
  validateRestaurantUpdate,
} from "../utils/validation/restaurant.validation";

export const restaurantRouter = Router();

// Get restaurant by restaurant id
restaurantRouter.get("/:restaurantId", async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  try {
    // Check restaurant id
    const restaurant = await validateRestaurantId(restaurantId);
    if (typeof restaurant === "string") {
      logger.warn(`Invalid restaurant ID: ${restaurantId}`);
      return res.status(400).send(restaurant);
    }

    // Response
    res.status(200).json(restaurant);
  } catch (error: unknown) {
    handleServerError(res, error, "Failed to get restaurant by ID");
  }
});

// Get restaurant by user id
restaurantRouter.get("/user/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    // Check user id
    const checkResult = await validateUserId(userId);
    if (typeof checkResult === "string") {
      logger.warn(`Invalid user ID: ${userId}`);
      return res.status(400).send(checkResult);
    }

    const restaurant = (await RestaurantModel.findOne(
      { userId },
      { __v: 0 }
    ).populate({
      path: "userId",
      select: "-_id -password -updatedAt -createdAt -__v",
    })) as RestaurantProps;

    // Response
    res.status(200).json(restaurant);
  } catch (error: unknown) {
    handleServerError(res, error, "Failed to get restaurant by user ID");
  }
});

// Post new restaurant
restaurantRouter.post("/", async (req: Request, res: Response) => {
  // Validate req body
  let validationResult = validateRestaurant(req.body);
  handleValidationError(res, validationResult);

  try {
    // Create new restaurant
    const newRestaurant = new RestaurantModel(req.body);
    // Save restaurant
    const restaurant = (await newRestaurant.save()) as RestaurantProps;

    // Response
    res.status(201).json(restaurant);
  } catch (error: unknown) {
    handleServerError(res, error, "Failed to create new restaurant");
  }
});

// Get restaurant categories
restaurantRouter.get(
  "/categories/:restaurantId",
  async (req: Request, res: Response) => {
    const { restaurantId } = req.params;

    try {
      // Check restaurant id
      const restaurant = await validateRestaurantId(restaurantId);
      if (typeof restaurant === "string") {
        logger.warn(`Invalid restaurant ID for categories: ${restaurantId}`);
        return res.status(400).send(restaurant);
      }

      // Response
      res.status(200).json(restaurant?.categories);
    } catch (error: unknown) {
      handleServerError(res, error, "Failed to get restaurant categories");
    }
  }
);

// Update restaurant data
restaurantRouter.put("/", verifyAuth, async (req: Request, res: Response) => {
  const { restaurantId } = req.user;

  // Validate req body
  let validationResult = validateRestaurantUpdate(req.body);
  handleValidationError(res, validationResult);

  try {
    // Update restaurant
    await RestaurantModel.updateOne({ _id: restaurantId }, { $set: req.body });

    // Response
    res.status(200).json("Restaurant updated successfully");
  } catch (error: unknown) {
    handleServerError(res, error, "Failed to update restaurant");
  }
});

// Update restaurant categories
restaurantRouter.put("/categories", async (req: Request, res: Response) => {
  // Validate req body
  let validationResult = validateCategories(req.body);
  handleValidationError(res, validationResult);

  try {
    // Update categories
    const restaurant = await RestaurantModel.findByIdAndUpdate(
      req.body.restaurantId,
      { categories: req.body.categories },
      { new: true } // Ensure the updated document is returned
    );

    // Response
    res.status(200).json(restaurant);
  } catch (error: unknown) {
    return handleServerError(
      res,
      error,
      "Failed to update restaurant categories"
    );
  }
});
