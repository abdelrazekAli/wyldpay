import { Router } from "express";
import { Request, Response } from "express";
import {
  checkUserId,
  validateCategories,
  validateLogo,
  validateRestaurant,
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

// update resaturant logo
restaurantRouter.put("/logo", async (req: Request, res: Response) => {
  try {
    // Validate req body
    let validationResult = validateLogo(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Update logo
    await RestaurantModel.updateOne(
      { _id: req.body._id },
      {
        logo: req.body.logo,
      }
    );

    // Response
    res.status(200).json("resaturant updated successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
