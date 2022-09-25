import joi from "joi";
import { Types } from "mongoose";
import ItemModel from "../models/item.model";
import RestaurantModel from "../models/restaurant.model";
import UserModel from "../models/user.model";

// User validation
export const validateUser = (data: object) => {
  const schema = joi.object({
    email: joi.string().required().email().max(255),
    password: joi.string().min(5).max(255),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phone: joi.number().required(),
    city: joi.string().required().max(255),
    state: joi.string().required().max(255),
    zip: joi.string().required().max(20),
    businessName: joi.string().required().min(2).max(255),
    businessAddress: joi.string().required().min(2).max(1000),
  });
  return schema.validate(data).error;
};

export const validateRestaurant = (data: object) => {
  const schema = joi.object({
    name: joi.string().required().max(255),
    logo: joi.string().required().max(1000),
    currency: joi.string().required().length(3).max(255),
    categories: joi.array(),
    userId: joi.string().required().max(255),
  });
  return schema.validate(data).error;
};

export const validateItem = (data: object) => {
  const schema = joi.object({
    name: joi.string().required().max(255),
    img: joi.string().required().max(1000),
    price: joi.number().required(),
    category: joi.string().required().max(255),
    desc: joi.string().max(1000),
    restId: joi.string().required().max(255),
  });
  return schema.validate(data).error;
};

export const validateCategories = (data: object) => {
  const schema = joi.object({
    categories: joi.array().required(),
    restaurantId: joi.string().required().max(255),
  });
  return schema.validate(data).error;
};

export const validateLogo = (data: object) => {
  const schema = joi.object({
    _id: joi.string().required().max(255),
    logo: joi.string().required().max(1000),
  });
  return schema.validate(data).error;
};

export const validateBank = (data: object) => {
  const schema = joi.object({
    name: joi.string().required().max(255),
    iban: joi.string().required().min(5).max(34),
    bic: joi.string().required().min(4).max(11),
    customerFees: joi.boolean(),
    userId: joi.string().required().max(255),
  });
  return schema.validate(data).error;
};

export const validatePaymentsMethods = (data: object) => {
  let method = joi
    .object()
    .required()
    .keys({
      name: joi.string().required().valid("stripe", "paypal"),
      publicKey: joi.string().required().max(1000),
      secretKey: joi.string().required().max(1000),
    });

  const schema = joi.object({
    paymentsMethods: joi.array().items(method).required(),
    userId: joi.string().required().max(255),
  });
  return schema.validate(data).error;
};

export const validateLogin = (data: object) => {
  const schema = joi.object({
    email: joi.string().required().email().max(255),
    password: joi.string().required().max(255),
  });
  return schema.validate(data).error;
};

export const validateSendResetPass = (data: object) => {
  const schema = joi.object({
    email: joi.string().required().email().max(255),
  });
  return schema.validate(data).error;
};

export const validateApplyCoupon = (data: object) => {
  const schema = joi.object({
    restId: joi.string().required().max(255),
  });
  return schema.validate(data).error;
};

export const validateResetPass = (data: object) => {
  const schema = joi.object({
    password: joi.string().required().min(5).max(255),
  });
  return schema.validate(data).error;
};

export const validateCoupon = (data: object) => {
  const schema = joi.object({
    name: joi.string().required().max(255),
    type: joi.string().valid("percentage", "amount").required(),
    value: joi.number().required().max(10000),
    limit: joi.number().required().max(10000),
    usage: joi.number().max(10000),
    restId: joi.string().required().max(255),
  });
  return schema.validate(data).error;
};

export const checkUserId = async (id: string) => {
  if (!id) return "User id is required";
  else {
    if (Types.ObjectId.isValid(id)) {
      let user = await UserModel.findById(id, {
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      });
      return user === null ? `There is no user with this id: ${id}` : user;
    } else return `User id: ${id} is not valid`;
  }
};

export const checkRestId = async (id: string) => {
  if (!id) return "Restaurant id is required";
  else {
    if (Types.ObjectId.isValid(id)) {
      let restaurant = await RestaurantModel.findById(id).populate({
        path: "userId",
      });
      return restaurant === null
        ? `There is no restaurant with this id: ${id}`
        : restaurant;
    } else return `Restaurant id: ${id} is not valid`;
  }
};

export const checkItemId = async (id: string) => {
  if (!id) return "Item id is required";
  else {
    if (Types.ObjectId.isValid(id)) {
      let item = await ItemModel.findById(id);
      return item === null ? `There is no item with this id: ${id}` : item;
    } else return `Item id: ${id} is not valid`;
  }
};
