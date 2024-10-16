import ItemModel from "../models/item.model";
import { ItemProps } from "../types/item.type";
import {
  deleteCachedValue,
  getCachedValue,
  setCacheValue,
} from "./cache.service";

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
  const cacheKey = `restaurant:${restId}:items`;

  // Check if the data is in cache
  const cachedItems = await getCachedValue(cacheKey);
  if (cachedItems) {
    return JSON.parse(cachedItems) as ItemProps[];
  }

  // If not in cache, fetch from the database
  const items: ItemProps[] = await ItemModel.find({ restId });

  // Cache the items for future requests
  await setCacheValue(cacheKey, JSON.stringify(items));
  return items;
};

// Save a new item to the database
export const saveNewItem = async (itemData: ItemProps): Promise<ItemProps> => {
  const cacheKey = `restaurant:${itemData.restId}:items`;

  // Save Item to database
  const newItem = new ItemModel(itemData);
  const item: ItemProps = await newItem.save();

  // Invalidate cache after adding new item
  await deleteCachedValue(cacheKey);

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

  // Invalidate cache after updating an item
  if (updatedItem) {
    const cacheKey = `restaurant:${updatedItem.restId}:items`;
    await deleteCachedValue(cacheKey);
  }

  return updatedItem;
};

// Delete an item by its ID
export const removeItemById = async (itemId: string): Promise<void> => {
  const item = await findItemById(itemId);
  if (item) {
    // invalidate the cache
    const cacheKey = `restaurant:${item.restId}:items`;
    await deleteCachedValue(cacheKey);
  }

  // Delete item from database
  await ItemModel.deleteOne({ _id: itemId });
};
