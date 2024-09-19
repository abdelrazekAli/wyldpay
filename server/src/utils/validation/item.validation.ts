import joi from "joi";

export const validateItemData = (data: object) => {
  const schema = joi.object({
    name: joi.string().required().max(255),
    img: joi.string().required().max(1000),
    price: joi.number().required(),
    category: joi.string().required().max(255),
    desc: joi.string().required().max(1000),
    ingredients: joi.string().required().max(1000),
    restId: joi.string().required().max(255),
  });
  return schema.validate(data).error;
};
