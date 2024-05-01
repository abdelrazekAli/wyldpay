import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateToken = (
  userData: { _id?: Types.ObjectId; email?: string },
  expiresIn: string
) => {
  return jwt.sign(userData, process.env.JWT_TOKEN_SECRET!, { expiresIn });
};
