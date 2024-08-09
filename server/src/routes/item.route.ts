import logger from "../utils/logger";
import ItemModel from "../models/item.model";
import { ItemProps } from "../types/item.type";
import { Request, Response, Router } from "express";
import { checkItemId, checkRestId, validateItem } from "../utils/validation";

export const itemRouter = Router();

// Get all item details by id
itemRouter.get("/:itemId", async (req: Request, res: Response) => {
  const { itemId } = req.params;
  try {
    // Find item
    const item = (await ItemModel.findById(itemId)) as ItemProps;

    if (!item) {
      logger.warn(`Item not found with id: ${itemId}`);
      return res.status(404).send("Item not found");
    }

    // Response
    res.status(200).json(item);
  } catch (err) {
    logger.error(`Failed to get item by id: ${itemId}, Error: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all items by restaurant id
itemRouter.get("/restaurant/:restId", async (req: Request, res: Response) => {
  const { restId } = req.params;
  try {
    // Check restaurant id
    const checkResult = (await checkRestId(restId)) as string | null;
    if (typeof checkResult === "string") {
      logger.warn(`Invalid restaurant id: ${restId}, Error: ${checkResult}`);
      return res.status(400).send(checkResult);
    }

    // Find items by restaurant id
    const items = (await ItemModel.find({ restId: restId })) as ItemProps[];

    // Response
    res.status(200).json(items);
  } catch (err) {
    logger.error(
      `Failed to get items for restaurant id: ${restId}, Error: ${err.message}`
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Post new item information
itemRouter.post("/", async (req: Request, res: Response) => {
  try {
    // Validate req body
    let validationResult = validateItem(req.body);
    if (validationResult) {
      logger.warn(`Invalid item data: ${validationResult.details[0].message}`);
      return res.status(400).send(validationResult.details[0].message);
    }

    // Create new item
    const newItem = new ItemModel(req.body);

    // Save item
    const item = (await newItem.save()) as ItemProps;

    // Response
    res.status(201).json(item);
  } catch (err) {
    logger.error(`Failed to create new item, Error: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update item by id
itemRouter.put("/id/:itemId", async (req: Request, res: Response) => {
  const { itemId } = req.params;
  try {
    // Validate req body
    let validationResult = validateItem(req.body);
    if (validationResult) {
      logger.warn(
        `Invalid item update data: ${validationResult.details[0].message}`
      );
      return res.status(400).send(validationResult.details[0].message);
    }

    // Check item id
    const checkResult = await checkItemId(itemId);

    if (typeof checkResult === "string") {
      logger.warn(`Invalid item id: ${itemId}, Error: ${checkResult}`);
      return res.status(400).send(checkResult);
    }

    // Update item
    const updatedItem = (await ItemModel.findByIdAndUpdate(
      itemId,
      { $set: req.body },
      { new: true }
    )) as ItemProps;

    if (!updatedItem) {
      logger.warn(`Item not found for update with id: ${itemId}`);
      return res.status(404).send("Item not found");
    }

    // Response
    res.status(200).json(updatedItem);
  } catch (err) {
    logger.error(
      `Failed to update item by id: ${itemId}, Error: ${err.message}`
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete item by id
itemRouter.delete("/id/:itemId", async (req: Request, res: Response) => {
  const { itemId } = req.params;
  try {
    // Check item id
    const checkResult = await checkItemId(itemId);

    if (typeof checkResult === "string") {
      logger.warn(
        `Invalid item id for deletion: ${itemId}, Error: ${checkResult}`
      );
      return res.status(400).send(checkResult);
    }

    // Delete item
    const result = await ItemModel.deleteOne({ _id: itemId });

    if (result.deletedCount === 0) {
      logger.warn(`Item not found for deletion with id: ${itemId}`);
      return res.status(404).send("Item not found");
    }

    // Response
    res.status(200).json(`Successfully deleted item with id: ${itemId}`);
  } catch (err) {
    logger.error(
      `Failed to delete item by id: ${itemId}, Error: ${err.message}`
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});
