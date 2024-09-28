import { Router } from "express";
import {
  getItem,
  getItemsByRestaurant,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/item.controller";
import { validateIdMiddleware } from "../middlewares/validateId.middleware";

export const itemRouter = Router();

// Get item by id
itemRouter.get("/:itemId", validateIdMiddleware("itemId"), getItem);

// Get items by restaurant id
itemRouter.get(
  "/restaurant/:restId",
  validateIdMiddleware("restId"),
  getItemsByRestaurant
);

// Create new item
itemRouter.post("/", createItem);

// Update item by id
itemRouter.put("/id/:itemId", validateIdMiddleware("itemId"), updateItem);

// Delete item by id
itemRouter.delete("/id/:itemId", validateIdMiddleware("itemId"), deleteItem);
