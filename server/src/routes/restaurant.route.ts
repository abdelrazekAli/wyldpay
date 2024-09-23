import { Request, Response, Router } from "express";
import RestaurantModel from "../models/restaurant.model";
import { RestaurantProps } from "../types/restaurant.type";
import { findRestById } from "../services/restaurant.service";
import { verifyAuth } from "../middlewares/verifyAuth.middleware";
import { handleClientError, handleServerError } from "../utils/error.util";
import { validateIdMiddleware } from "../middlewares/validateId.middleware";
import { handleValidationError } from "../utils/validation/helper.validation";
import {
  validateRestaurantId,
  validateUserId,
} from "../utils/validation/Id.validation";
import {
  validateCategories,
  validateRestaurantData,
  validateRestaurantUpdate,
} from "../utils/validation/restaurant.validation";

export const restaurantRouter = Router();

// Get restaurant by restaurant id
restaurantRouter.get(
  "/:restaurantId",
  validateIdMiddleware("restaurantId"),
  async (req: Request, res: Response) => {
    const { restaurantId } = req.params;

    try {
      const restaurant = await findRestById(restaurantId);
      if (!restaurant)
        return handleClientError(
          res,
          `restaurant with id ${restaurantId} not found`,
          404
        );

      // Response
      res.status(200).json(restaurant);
    } catch (error: unknown) {
      handleServerError(res, error, "Failed to get restaurant by ID");
    }
  }
);

// Get restaurant by user id
restaurantRouter.get("/user/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    // Check user id
    const checkUserResult = await validateUserId(userId);
    if (typeof checkUserResult === "string") {
      return handleClientError(res, checkUserResult);
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
restaurantRouter.post(
  "/",
  async (req: Request, res: Response<RestaurantProps>) => {
    // Validate req body
    const { error, value: restaurantData } = validateRestaurantData(req.body);
    if (error) return handleValidationError(res, error);

    try {
      // Create new restaurant
      const newRestaurant = new RestaurantModel(restaurantData);
      // Save restaurant
      const restaurant = await newRestaurant.save();

      // Response
      res.status(200).json(restaurant);
    } catch (error: unknown) {
      handleServerError(res, error, "Failed to create new restaurant");
    }
  }
);

// Get restaurant categories
restaurantRouter.get(
  "/categories/:restaurantId",
  async (req: Request, res: Response) => {
    const { restaurantId } = req.params;

    try {
      const checkRestId = await validateRestaurantId(restaurantId);
      if (typeof checkRestId === "string") {
        return handleClientError(res, checkRestId);
      }

      // Response
      res.status(200).json(checkRestId?.categories);
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
  if (validationResult) {
    return handleValidationError(res, validationResult);
  }

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
  if (validationResult) {
    return handleValidationError(res, validationResult);
  }

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
