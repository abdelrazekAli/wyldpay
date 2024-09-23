import { Request, Response, NextFunction } from "express";
import { validateObjectId } from "../utils/validation/Id.validation";
import { handleClientError } from "../utils/error.util";

// Middleware to validate ObjectId from req.params
export const validateIdMiddleware =
  (paramName: string) => (req: Request, res: Response, next: NextFunction) => {
    const error = validateObjectId(req.params[paramName]);

    if (error) {
      console.log("t", error);
      return handleClientError(res, "Invalid ID format");
    }

    next();
  };
