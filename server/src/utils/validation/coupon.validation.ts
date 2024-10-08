import joi from "joi";

export const validateCouponData = (data: object) => {
  const schema = joi.object({
    code: joi.string().required().max(255),
    type: joi.string().valid("percentage", "amount").required(),
    value: joi.number().required().max(10000),
    limit: joi.number().required().max(10000),
    usage: joi.number().max(10000),
  });
  return schema.validate(data);
};

export const validateApplyCoupon = (data: object) => {
  const schema = joi.object({
    code: joi.string().required().max(255),
  });
  return schema.validate(data);
};
