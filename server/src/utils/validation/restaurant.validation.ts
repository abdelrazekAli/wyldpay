import joi from "joi";

// Validate restaurant creation data
export const validateRestaurantData = (data: object) => {
  const schema = joi.object({
    logo: joi.string().required().max(1000),
    background: joi.string().required().max(1000),
    vatNum: joi.string().required().max(255),
    vatPercentage: joi.number().max(100),
    currency: joi.string().required().length(3),
    categories: joi.array(),
    userId: joi.string().max(255),
  });
  return schema.validate(data);
};

// Validate restaurant update data
export const validateRestaurantUpdate = (data: object) => {
  const schema = joi.object({
    logo: joi.string().max(1000),
    background: joi.string().max(1000),
    vatNum: joi.string().max(255),
    vatPercentage: joi.number().max(100),
  });
  return schema.validate(data);
};

// Validate categories for a restaurant
export const validateCategories = (data: object) => {
  const schema = joi.object({
    categories: joi.array().required(),
    restaurantId: joi.string().required().max(255),
  });
  return schema.validate(data);
};
