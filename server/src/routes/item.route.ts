import { Router } from "express";
import { verifyAuth } from "../middlewares/verifyAuth.middleware";
import { validateIdMiddleware } from "../middlewares/validateId.middleware";
import {
  getItem,
  getItemsByRestaurant,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/item.controller";

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
itemRouter.post("/", verifyAuth, createItem);

// Update item by id
itemRouter.put(
  "/id/:itemId",
  verifyAuth,
  validateIdMiddleware("itemId"),
  updateItem
);

// Delete item by id
itemRouter.delete(
  "/id/:itemId",
  verifyAuth,
  validateIdMiddleware("itemId"),
  deleteItem
);
