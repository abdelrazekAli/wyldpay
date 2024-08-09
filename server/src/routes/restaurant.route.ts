import logger from "../utils/logger";
import { Request, Response, Router } from "express";
import RestaurantModel from "../models/restaurant.model";
import { RestaurantProps } from "../types/restaurant.type";
import { verifyAuth } from "../middlewares/token.auth.middleware";
import { handleValidation } from "../utils/validation/helper.validation";
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
  } catch (err) {
    logger.error(`Failed to get restaurant by ID: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
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
  } catch (err) {
    logger.error(`Failed to get restaurant by user ID: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Post new restaurant
restaurantRouter.post("/", async (req: Request, res: Response) => {
  // Validate req body
  let validationResult = validateRestaurant(req.body);
  handleValidation(validationResult, res, 400);

  try {
    // Create new restaurant
    const newRestaurant = new RestaurantModel(req.body);
    // Save restaurant
    const restaurant = (await newRestaurant.save()) as RestaurantProps;

    // Response
    res.status(201).json(restaurant);
  } catch (err) {
    logger.error(`Failed to create restaurant: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
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
    } catch (err) {
      logger.error(`Failed to get restaurant categories: ${err.message}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Update restaurant data
restaurantRouter.put("/", verifyAuth, async (req: Request, res: Response) => {
  const { restaurantId } = req.user;

  // Validate req body
  let validationResult = validateRestaurantUpdate(req.body);
  handleValidation(validationResult, res, 400);

  try {
    // Update restaurant
    await RestaurantModel.updateOne({ _id: restaurantId }, { $set: req.body });

    // Response
    res.status(200).json("Restaurant updated successfully");
  } catch (err) {
    logger.error(`Failed to update restaurant: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update restaurant categories
restaurantRouter.put("/categories", async (req: Request, res: Response) => {
  // Validate req body
  let validationResult = validateCategories(req.body);
  handleValidation(validationResult, res, 400);

  try {
    // Update categories
    const restaurant = await RestaurantModel.findByIdAndUpdate(
      req.body.restaurantId,
      { categories: req.body.categories },
      { new: true } // Ensure the updated document is returned
    );

    // Response
    res.status(200).json(restaurant);
  } catch (err) {
    logger.error(`Failed to update restaurant categories: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
