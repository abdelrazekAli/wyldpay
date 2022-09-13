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
