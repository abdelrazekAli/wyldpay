import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export const generateToken = (
  userData: { _id?: ObjectId; email?: string; restaurantId?: ObjectId },
  expiresIn: string
) => {
  return jwt.sign(userData, process.env.JWT_TOKEN_SECRET!, { expiresIn });
};
