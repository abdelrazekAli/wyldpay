import joi from "joi";
import { UserProps } from "../../types/user.type";

// Common validation rules
const emailRule = joi.string().required().email().max(255);
const passwordRule = joi.string().required().min(5).max(255);
const link = joi.object().keys({
  name: joi
    .string()
    .required()
    .valid(
      "google",
      "instagram",
      "telegram",
      "youtube",
      "twitter",
      "facebook",
      "whatsapp"
    ),
  value: joi.string().required().max(1000),
});

// User Data Validation
export const validateUserData = (
  data: UserProps,
  isUpdate: boolean = false
) => {
  const schema = joi.object({
    email: joi.string().email().max(255),
    password: !isUpdate ? joi.string().min(5).max(255) : joi.forbidden(),
    firstName: joi.string(),
    lastName: joi.string(),
    phone: joi
      .string()
      .pattern(/^[0-9]+$/)
      .max(20),
    city: joi.string().max(255),
    state: joi.string().max(255),
    zip: joi.string().max(20),
    vatNum: joi.string().max(255),
    vatPercentage: joi.number().max(100),
    businessName: joi.string().min(2).max(255),
    businessAddress: joi.string().min(2).max(1000),
    socialLinks: joi.array().items(link),
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
