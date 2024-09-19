import { Response } from "express";
import { handleClientError } from "../error";

export const handleValidationError = (res: Response, validationResult: any) => {
  return handleClientError(
    res,
    validationResult.details[0].message || "Invalid data"
  );
};
