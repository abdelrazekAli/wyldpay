import joi from "joi";

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
