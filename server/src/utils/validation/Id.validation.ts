import { Types } from "mongoose";
import UserModel from "../../models/user.model";
import ItemModel from "../../models/item.model";
import RestaurantModel from "../../models/restaurant.model";

const validateId = async (id: string, model: any, errorMessage: string) => {
  if (!id) return `ID is required`;
  if (Types.ObjectId.isValid(id)) {
    let item = await model.findById(id);
    return item === null ? errorMessage : item;
  } else return `ID: ${id} is not valid`;
};

export const validateUserId = (id: string) =>
  validateId(id, UserModel, `There is no user with this id: ${id}`);
export const validateRestaurantId = (id: string) =>
  validateId(id, RestaurantModel, `There is no restaurant with this id: ${id}`);
export const validateItemId = (id: string) =>
  validateId(id, ItemModel, `There is no item with this id: ${id}`);
