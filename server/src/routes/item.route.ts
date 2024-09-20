import ItemModel from "../models/item.model";
import { ItemProps } from "../types/item.type";
import { Request, Response, Router } from "express";
import { handleClientError, handleServerError } from "../utils/error";
import { validateItemData } from "../utils/validation/item.validation";
import { handleValidationError } from "../utils/validation/helper.validation";
import {
  validateRestaurantId,
  validateItemId,
} from "../utils/validation/Id.validation";

export const itemRouter = Router();

// Get all item details by id
itemRouter.get("/:itemId", async (req: Request, res: Response) => {
  const { itemId } = req.params;
  try {
    // Find item
    const item = (await ItemModel.findById(itemId)) as ItemProps;
    if (!item) {
      return handleClientError(res, `Item not found: ${itemId}`, 404);
    }

    // Response
    res.status(200).json(item);
  } catch (error: unknown) {
    return handleServerError(res, error, `Failed to get item by id: ${itemId}`);
  }
});

// Get all items by restaurant id
itemRouter.get("/restaurant/:restId", async (req: Request, res: Response) => {
  const { restId } = req.params;
  try {
    // Check restaurant id
    const checkResult = (await validateRestaurantId(restId)) as string | null;
    if (typeof checkResult === "string") {
      return handleClientError(
        res,
        `Invalid restaurant id: ${restId}, Error: ${checkResult}`
      );
    }

    // Find items by restaurant id
    const items = (await ItemModel.find({ restId: restId })) as ItemProps[];

    // Response
    res.status(200).json(items);
  } catch (error: unknown) {
    return handleServerError(
      res,
      error,
      `Failed to get items for restaurant id: ${restId}`
    );
  }
});

// Post new item information
itemRouter.post("/", async (req: Request, res: Response) => {
  try {
    // Validate req body
    let validationResult = validateItemData(req.body);
    if (validationResult) return handleValidationError(res, validationResult);

    // Create new item
    const newItem = new ItemModel(req.body);

    // Save item
    const item = (await newItem.save()) as ItemProps;

    // Response
    res.status(201).json(item);
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to create new item");
  }
});

// Update item by id
itemRouter.put("/id/:itemId", async (req: Request, res: Response) => {
  const { itemId } = req.params;
  try {
    // Validate req body
    let validationResult = validateItemData(req.body);
    if (validationResult) return handleValidationError(res, validationResult);

    // Check item id
    const checkResult = await validateItemId(itemId);
    if (typeof checkResult === "string") {
      return handleClientError(
        res,
        `Invalid item id: ${itemId}, Error: ${checkResult}`
      );
    }

    // Update item
    const updatedItem = (await ItemModel.findByIdAndUpdate(
      itemId,
      { $set: req.body },
      { new: true }
    )) as ItemProps;

    // Response
    res.status(200).json(updatedItem);
  } catch (error: unknown) {
    return handleServerError(
      res,
      error,
      `Failed to update item by id: ${itemId}`
    );
  }
});

// Delete item by id
itemRouter.delete("/id/:itemId", async (req: Request, res: Response) => {
  const { itemId } = req.params;
  try {
    // Check item id
    const checkResult = await validateItemId(itemId);

    if (typeof checkResult === "string") {
      return handleClientError(res, `Invalid item: ${checkResult}`, 400);
    }

    // Delete item
    const result = await ItemModel.deleteOne({ _id: itemId });

    // Response
    res.status(200).json(`Successfully deleted item with id: ${itemId}`);
  } catch (error: unknown) {
    return handleServerError(
      res,
      error,
      `Failed to delete item by id: ${itemId}`
    );
  }
});
