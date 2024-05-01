import { Router } from "express";
import { Request, Response } from "express";
import OrderModel from "../models/order.model";
import { verifyAuth } from "../middlewares/token.auth.middleware";
import {
  checkRestId,
  handleValidation,
  validateOrder,
} from "../utils/validation";

export const orderRouter = Router();

// Get order by id
orderRouter.get("/:orderId", async (req: Request, res: Response) => {
  const { orderId } = req.params;

  try {
    const order = await OrderModel.findById(orderId);

    // Response
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get all orders by restaurant id
orderRouter.get("/", verifyAuth, async (req: Request, res: Response) => {
  const { restaurantId } = req.user;

  try {
    // Check restaurant id
    const checkResult = (await checkRestId(restaurantId)) as string | null;
    if (checkResult === "string") return res.status(400).send(checkResult);

    const orders = await OrderModel.find(
      {
        restId: restaurantId,
      },
      { __v: 0 }
    ).sort({ createdAt: -1 });

    // Response
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Post new order
orderRouter.post("/", async (req: Request, res: Response) => {
  // Validate req body
  let validationResult = validateOrder(req.body);
  handleValidation(validationResult, res, 400);

  try {
    // Create new order
    const newOrder = new OrderModel(req.body);

    // Save order
    const order = await newOrder.save();

    // Response
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
