import { Router } from "express";
import { Request, Response } from "express";
import { validateRestaurant } from "../utils/validation";
import RestaurantModel from "../models/restaurant.model";

export const restaurantRouter = Router();

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
