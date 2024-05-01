import { Types } from "mongoose";
import { generateToken } from "./generateToken";

export const generateAccessToken = (userData: {
  _id: Types.ObjectId;
  restaurantId?: Types.ObjectId;
}) => generateToken(userData, "30d");

export const generateRegisterToken = (userData: { email: string }) =>
  generateToken(userData, "6h");

export const generateResetPassToken = (userData: { _id: Types.ObjectId }) =>
  generateToken(userData, "6h");
