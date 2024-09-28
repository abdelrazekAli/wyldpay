import { Types } from "mongoose";

// ObjectId Validation
export const validateObjectId = (id: string): any => {
  if (!Types.ObjectId.isValid(id)) {
    return "Invalid ID format";
  }
};
