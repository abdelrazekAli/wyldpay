import { ObjectId } from "mongoose";
import { generateToken } from "./generateToken";

export const generateAccessToken = (userData: {
  _id: ObjectId;
  restaurantId?: ObjectId;
}) => generateToken(userData, "30d");

export const generateRegisterToken = (userData: { email: string }) =>
  generateToken(userData, "6h");

export const generateResetPassToken = (userData: { _id: ObjectId }) =>
  generateToken(userData, "6h");
