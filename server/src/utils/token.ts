import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateAccessToken = (userData: {
  _id: Types.ObjectId;
  restaurantId?: Types.ObjectId;
}) => {
  return jwt.sign(userData, process.env.JWT_TOKEN_SECRET!, {
    expiresIn: "30d",
  });
};

export const generateRegisterToken = (userData: { email: string }) => {
  return jwt.sign(userData, process.env.JWT_TOKEN_SECRET!, {
    expiresIn: "6h",
  });
};
