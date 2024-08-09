import joi from "joi";

export const validateBank = (data: object) => {
  const schema = joi.object({
    name: joi.string().required().max(255),
    iban: joi.string().required().min(5).max(34),
    bic: joi.string().required().min(4).max(11),
    customerFees: joi.boolean(),
    userId: joi.string().max(255),
  });
  return schema.validate(data).error;
};
