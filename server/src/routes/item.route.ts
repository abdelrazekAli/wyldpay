import { Router } from "express";
import { Request, Response } from "express";
import ItemModel from "../models/item.model";
import { checkItemId, checkRestId, validateItem } from "../utils/validation";

export const itemRouter = Router();

// Post new item informaton
itemRouter.post("/", async (req: Request, res: Response) => {
  try {
    // Validate req body
    let validationResult = validateItem(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Create new item
    const newItem = new ItemModel(req.body);

    // Save item
    const item = await newItem.save();

    // Response
    res.status(200).json(item);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update item by id
itemRouter.put("/id/:itemId", async (req: Request, res: Response) => {
  try {
    let item;
    const { itemId } = req.params;

    // Validate req body
    let validationResult = validateItem(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Check item id
    const checkResult = await checkItemId(itemId);

    typeof checkResult === "string"
      ? res.status(400).send(checkResult)
      : (item = checkResult);

    // Update item
    const updatedItem = await ItemModel.findByIdAndUpdate(
      itemId,
      { $set: req.body },
      { new: true }
    );

    // Response
    res.status(200).json(updatedItem);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete item by id
itemRouter.delete("/id/:itemId", async (req: Request, res: Response) => {
  try {
    let item;
    const { itemId } = req.params;

    // Check item id
    const checkResult = await checkItemId(itemId);

    typeof checkResult === "string"
      ? res.status(400).send(checkResult)
      : (item = checkResult);

    // Delete item
    await item?.delete();

    // Response
    res.status(200).json(`Successfully deleted item with id : ${itemId}`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get items by retaurant
itemRouter.get("/restaurant/:restId", async (req: Request, res: Response) => {
  try {
    const { restId } = req.params;

    // Check restaurant id
    const checkResult = await checkRestId(restId);
    if (typeof checkResult === "string")
      return res.status(400).send(checkResult);

    // Find items by restaurant id
    const items = await ItemModel.find({ restId: restId });

    // Response
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});