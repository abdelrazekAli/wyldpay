import joi from "joi";

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

export const validateApplyCoupon = (data: object) => {
  const schema = joi.object({
    couponCode: joi.string().required().max(255),
  });
  return schema.validate(data).error;
};
