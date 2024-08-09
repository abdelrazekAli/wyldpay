import { Response } from "express";

export const handleValidation = (
  validationResult: any,
  res: Response,
  statusCode: number
) => {
  if (validationResult) {
    return res.status(statusCode).send(validationResult.details[0].message);
  }
};
