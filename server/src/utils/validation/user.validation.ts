import joi from "joi";

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
  const link = joi.object().keys({
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
