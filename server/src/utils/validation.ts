import joi from "joi";
import { Types } from "mongoose";
import UserModel from "../models/user.model";
import ItemModel from "../models/item.model";
import RestaurantModel from "../models/restaurant.model";

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
    vatNum: joi.string().max(255),
    vatPercentage: joi.number().max(100),
    businessName: joi.string().required().min(2).max(255),
    businessAddress: joi.string().required().min(2).max(1000),
  });
  return schema.validate(data).error;
};

export const validateEmail = (data: object) => {
  const schema = joi.object({
    email: joi.string().required().email().max(255),
  });
  return schema.validate(data).error;
};
export const validateUpdateUserLinks = (data: object) => {
  let link = joi.object().keys({
    name: joi
      .string()
      .required()
      .valid("google", "instagram", "telegram", "youtube", "twitter"),
    value: joi.string().required().max(1000),
  });
  const schema = joi.object({
    socialLinks: joi.array().required().items(link),
  });
  return schema.validate(data).error;
};

export const validateRestaurant = (data: object) => {
  const schema = joi.object({
    logo: joi.string().required().max(1000),
    background: joi.string().required().max(1000),
    vatNum: joi.string().required().max(255),
    vatPercentage: joi.number().max(100),
    currency: joi.string().required().length(3).max(255),
    categories: joi.array(),
    userId: joi.string().max(255),
  });
  return schema.validate(data).error;
};

export const validateItem = (data: object) => {
  const schema = joi.object({
    name: joi.string().required().max(255),
    img: joi.string().required().max(1000),
    price: joi.number().required(),
    category: joi.string().required().max(255),
    desc: joi.string().required().max(1000),
    ingredients: joi.string().required().max(1000),
    restId: joi.string().required().max(255),
  });
  return schema.validate(data).error;
};

export const validateOrder = (data: object) => {
  const schema = joi.object({
    items: joi.array().required(),
    totalPrice: joi.number().required(),
    tip: joi.number().allow(null),
    discount: joi.object().allow(null),
    tableNum: joi.number().required(),
    restId: joi.string().required().max(255),
    notes: joi.string().allow("").max(10000),
    paymentMethod: joi.string().required().valid("Visa", "PayPal", "Apple pay"),
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

export const validateRestaurantUpdate = (data: object) => {
  const schema = joi.object({
    logo: joi.string().max(1000),
    background: joi.string().max(1000),
    vatNum: joi.string().max(255),
    vatPercentage: joi.number().max(100),
  });
  return schema.validate(data).error;
};

export const validateBank = (data: object) => {
  const schema = joi.object({
    name: joi.string().required().max(255),
    iban: joi.string().required().min(5).max(34),
    bic: joi.string().required().min(4).max(11),
    customerFees: joi.boolean(),
    userId: joi.string().max(255),
  });
  return schema.validate(data).error;
};

export const validatePaymentkeys = (data: object) => {
  const schema = joi.object({
    name: joi.string().required().valid("stripe", "paypal"),
    publicKey: joi.string().required().allow("").max(1000),
    secretKey: joi.string().required().allow("").max(1000),
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
    couponCode: joi.string().required().max(255),
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
  });
  return schema.validate(data).error;
};

export const validateStripePaymentIntent = (data: object) => {
  const schema = joi.object({
    amount: joi.number().required().max(100000),
    currency: joi
      .string()
      .valid("eur", "usd", "uah", "aed", "gbp", "egp")
      .required(),
    secretKey: joi.string().required().max(1000),
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
        select: " -password -updatedAt -createdAt -__v",
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
