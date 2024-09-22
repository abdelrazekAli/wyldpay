import joi from "joi";

// Common validation rules
const emailRule = joi.string().required().email().max(255);
const passwordRule = joi.string().required().min(5).max(255);

// User Data Validation
export const validateUserData = (data: object) => {
  const schema = joi.object({
    email: emailRule,
    password: passwordRule,
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    phone: joi
      .string()
      .required()
      .pattern(/^[0-9]+$/)
      .max(20),
    city: joi.string().required().max(255),
    state: joi.string().required().max(255),
    zip: joi.string().required().max(20),
    vatNum: joi.string().max(255),
    vatPercentage: joi.number().max(100),
    businessName: joi.string().required().min(2).max(255),
    businessAddress: joi.string().required().min(2).max(1000),
  });
  return schema.validate(data);
};

// Email Validation
export const validateEmail = (data: object) => {
  const schema = joi.object({
    email: emailRule,
  });
  return schema.validate(data);
};

// Social Links Update Validation
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
  return schema.validate(data);
};

// Login Data Validation
export const validateLoginData = (data: object) => {
  const schema = joi.object({
    email: emailRule,
    password: passwordRule,
  });
  return schema.validate(data);
};

// Send Reset Password Email Validation
export const validateSendResetPass = (data: object) => {
  const schema = joi.object({
    email: emailRule,
  });
  return schema.validate(data);
};

// Reset Password Validation
export const validateResetPass = (data: object) => {
  const schema = joi.object({
    password: passwordRule,
  });
  return schema.validate(data);
};
