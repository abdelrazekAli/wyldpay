import joi from "joi";

export const validateBankData = (data: object) => {
  const schema = joi.object({
    name: joi.string().required().max(255),
    iban: joi
      .string()
      .required()
      .regex(/^[A-Z0-9]{5,34}$/),
    bic: joi
      .string()
      .required()
      .regex(/^[A-Za-z0-9]{4,11}$/),
    customerFees: joi.boolean().default(false),
    userId: joi.string().max(255),
  });
  return schema.validate(data);
};
