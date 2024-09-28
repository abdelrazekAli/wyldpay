import ItemModel from "../models/item.model";
import { ItemProps } from "../types/item.type";

// Find an item by its ID
export const findItemById = async (
  itemId: string
): Promise<ItemProps | null> => {
  const item = (await ItemModel.findById(itemId)) as ItemProps | null;
  return item;
};

// Find all items by restaurant ID
export const findItemsByRestaurantId = async (
  restId: string
): Promise<ItemProps[]> => {
  const items = (await ItemModel.find({ restId })) as ItemProps[];
  return items;
};

// Save a new item to the database
export const saveNewItem = async (itemData: ItemProps): Promise<ItemProps> => {
  const newItem = new ItemModel(itemData);
  const item = (await newItem.save()) as ItemProps;
  return item;
};

// Update an existing item by its ID
export const modifyItemById = async (
  itemId: string,
  itemData: ItemProps
): Promise<ItemProps | null> => {
  const updatedItem = (await ItemModel.findByIdAndUpdate(
    itemId,
    { $set: itemData },
    { new: true }
  )) as ItemProps | null;
  return updatedItem;
};

// Delete an item by its ID
export const removeItemById = async (itemId: string): Promise<void> => {
  await ItemModel.deleteOne({ _id: itemId });
};
