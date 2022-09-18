import joi from "joi";

// User validation
export const validateUser = (data: object) => {
  const schema = joi.object({
    email: joi.string().required().email().max(255),
    password: joi.string().required().min(5).max(255),
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

export const validateCategories = (data: object) => {
  const schema = joi.object({
    categories: joi.array().required(),
    restaurantId: joi.string().required().max(255),
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

export const validateResetPass = (data: object) => {
  const schema = joi.object({
    password: joi.string().required().min(5).max(255),
  });
  return schema.validate(data).error;
};
