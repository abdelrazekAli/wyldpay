import { Router } from "express";
import { Request, Response } from "express";
import {
  checkRestId,
  checkUserId,
  validateCategories,
  validateRestaurant,
  validateRestaurantUpdate,
} from "../utils/validation";
import RestaurantModel from "../models/restaurant.model";

export const restaurantRouter = Router();

// Get restaurant by user id
restaurantRouter.get("/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Check user id
    const checkResult = await checkUserId(userId);
    if (typeof checkResult === "string")
      return res.status(400).send(checkResult);

    const restaurant = await RestaurantModel.findOne(
      {
        userId: userId,
      },
      { __v: 0 }
    ).populate({
      path: "userId",
      select: "-_id -password -updatedAt -createdAt -__v",
    });

    // Response
    res.status(200).json(restaurant);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Post new resaturant
restaurantRouter.post("/", async (req: Request, res: Response) => {
  try {
    // Validate req body
    let validationResult = validateRestaurant(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Create new resaturant
    const newRestaurant = new RestaurantModel(req.body);

    // Save resaturant
    const resaturant = await newRestaurant.save();

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
    try {
      let restaurant,
        { restaurantId } = req.params;

      // Check restaurant id
      const checkResult = await checkRestId(restaurantId);
      typeof checkResult === "string"
        ? res.status(400).send(checkResult)
        : (restaurant = checkResult);

      // Response
      res.status(200).json(restaurant?.categories);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

// update resaturant data
restaurantRouter.put("/", async (req: Request, res: Response) => {
  try {
    // Validate req body
    let validationResult = validateRestaurantUpdate(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Update resaturant
    await RestaurantModel.updateOne(
      { _id: req.body._id },
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
  try {
    // Validate req body
    let validationResult = validateCategories(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

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
