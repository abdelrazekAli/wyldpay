import joi from "joi";

export const validatePaymentkeys = (data: object) => {
  const schema = joi.object({
    name: joi.string().required().valid("stripe", "paypal"),
    publicKey: joi.string().required().allow("").max(1000),
    secretKey: joi.string().required().allow("").max(1000),
  });
  return schema.validate(data);
};

export const validateStripePaymentIntent = (data: object) => {
  const schema = joi.object({
    amount: joi.number().required().max(100000),
    currency: joi
      .string()
      .valid("eur", "usd", "uah", "aed", "gbp", "egp")
      .required(),
    secretKey: joi.string().required().max(1000),
  });
  return schema.validate(data);
};
