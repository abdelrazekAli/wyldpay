import { Request, Response } from "express";
import { validateItemData } from "../utils/validation/item.validation";
import { handleClientError, handleServerError } from "../utils/error.util";
import { handleValidationError } from "../utils/validation/helper.validation";
import {
  findItemById,
  findItemsByRestaurantId,
  saveNewItem,
  modifyItemById,
  removeItemById,
} from "../services/item.service";

// Get item by id
export const getItem = async (req: Request, res: Response) => {
  const { itemId } = req.params;
  try {
    // Fetch item from the database
    const item = await findItemById(itemId);
    if (!item) {
      return handleClientError(res, `Item not found: ${itemId}`, 404);
    }
    // Send response with the found item
    res.status(200).json(item);
  } catch (error: unknown) {
    return handleServerError(res, error, `Failed to get item by id: ${itemId}`);
  }
};

// Get all items by restaurant id
export const getItemsByRestaurant = async (req: Request, res: Response) => {
  const { restId } = req.params;
  try {
    // Fetch items associated with the restaurant from the database
    const items = await findItemsByRestaurantId(restId);
    // Send response with the found items
    res.status(200).json(items);
  } catch (error: unknown) {
    return handleServerError(
      res,
      error,
      `Failed to get items for restaurant id: ${restId}`
    );
  }
};

// Create a new item
export const createItem = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const { error, value: itemData } = validateItemData(req.body);
    if (error) return handleValidationError(res, error);

    // Save the new item to the database
    const item = await saveNewItem(itemData);
    // Send response with the newly created item
    res.status(201).json(item);
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to create new item");
  }
};

// Update an existing item by id
export const updateItem = async (req: Request, res: Response) => {
  const { itemId } = req.params;
  try {
    // Validate the request body
    const { error, value: itemData } = validateItemData(req.body);
    if (error) return handleValidationError(res, error);

    // Update the item in the database
    const updatedItem = await modifyItemById(itemId, itemData);
    // Send response with the updated item
    res.status(200).json(updatedItem);
  } catch (error: unknown) {
    return handleServerError(
      res,
      error,
      `Failed to update item by id: ${itemId}`
    );
  }
};

// Delete an item by id
export const deleteItem = async (req: Request, res: Response) => {
  const { itemId } = req.params;
  try {
    // Remove the item from the database
    await removeItemById(itemId);
    // Send confirmation response
    res.status(200).json(`Successfully deleted item with id: ${itemId}`);
  } catch (error: unknown) {
    return handleServerError(
      res,
      error,
      `Failed to delete item by id: ${itemId}`
    );
  }
};
