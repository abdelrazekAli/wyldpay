import joi from "joi";

export const validateRestaurantData = (data: object) => {
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

export const validateRestaurantUpdate = (data: object) => {
  const schema = joi.object({
    logo: joi.string().max(1000),
    background: joi.string().max(1000),
    vatNum: joi.string().max(255),
    vatPercentage: joi.number().max(100),
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
