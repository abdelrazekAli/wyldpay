import { Router } from "express";
import { Request, Response } from "express";
import {
  checkRestId,
  checkUserId,
  handleValidation,
  validateCategories,
  validateRestaurant,
  validateRestaurantUpdate,
} from "../utils/validation";
import RestaurantModel from "../models/restaurant.model";
import { RestaurantProps } from "../types/restaurant.type";
import { verifyAuth } from "../middlewares/token.auth.middleware";

export const restaurantRouter = Router();

// Get restaurant by restaurant id
restaurantRouter.get("/:restaurantId", async (req: Request, res: Response) => {
  const { restaurantId } = req.params;

  try {
    // Check restaurant id
    const restaurant: RestaurantProps | string = await checkRestId(
      restaurantId
    );
    if (typeof restaurant === "string") {
      return res.status(400).send(restaurant);
    }
    res.status(200).json(restaurant);

    // Response
    res.status(200).json(restaurant);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get restaurant by user id
restaurantRouter.get("/user/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    // Check user id
    const checkResult = await checkUserId(userId);
    if (typeof checkResult === "string")
      return res.status(400).send(checkResult);

    const restaurant = (await RestaurantModel.findOne(
      {
        userId,
      },
      { __v: 0 }
    ).populate({
      path: "userId",
      select: "-_id -password -updatedAt -createdAt -__v",
    })) as RestaurantProps;

    // Response
    res.status(200).json(restaurant);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Post new resaturant
restaurantRouter.post("/", async (req: Request, res: Response) => {
  // Validate req body
  let validationResult = validateRestaurant(req.body);
  handleValidation(validationResult, res, 400);

  try {
    // Create new resaturant
    const newRestaurant = new RestaurantModel(req.body);
    // Save resaturant
    const resaturant = (await newRestaurant.save()) as RestaurantProps;

    // Response
    res.status(200).json(resaturant);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get resaturant categories
restaurantRouter.get(
  "/categories/:restaurantId",
  async (req: Request, res: Response) => {
    const { restaurantId } = req.params;

    try {
      // Check restaurant id
      const restaurant: RestaurantProps | string = await checkRestId(
        restaurantId
      );
      if (typeof restaurant === "string") {
        return res.status(400).send(restaurant);
      }

      // Response
      res.status(200).json(restaurant?.categories);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

// update resaturant data
restaurantRouter.put("/", verifyAuth, async (req: Request, res: Response) => {
  const { restaurantId } = req.user;

  // Validate req body
  let validationResult = validateRestaurantUpdate(req.body);
  handleValidation(validationResult, res, 400);

  try {
    // Update resaturant
    await RestaurantModel.updateOne(
      { _id: restaurantId },
      {
        $set: req.body,
      }
    );

    // Response
    res.status(200).json("resaturant updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update resaturant categories
restaurantRouter.put("/categories", async (req: Request, res: Response) => {
  // Validate req body
  let validationResult = validateCategories(req.body);
  handleValidation(validationResult, res, 400);

  try {
    // Update categories
    const resaturant = await RestaurantModel.findByIdAndUpdate(
      req.body.restaurantId,
      {
        categories: req.body.categories,
      }
    );

    // Response
    res.status(200).json(resaturant);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
