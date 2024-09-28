import { Request, Response, NextFunction } from "express";
import { handleClientError } from "../utils/error.util";
import { validateObjectId } from "../utils/validation/Id.validation";

// Middleware to validate ObjectId from req.params
export const validateIdMiddleware =
  (paramName: string) => (req: Request, res: Response, next: NextFunction) => {
    const error = validateObjectId(req.params[paramName]);

    if (error) {
      return handleClientError(res, "Invalid ID format");
    }

    next();
  };
