import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import logger from "../utils/logger";
import TokenModel from "../models/token.model";
import { TokenProps } from "../types/token.type";

// Generate JWT token
export const generateToken = (
  data: { _id?: ObjectId; email?: string; restaurantId?: ObjectId },
  expiresIn: string
) => {
  try {
    return jwt.sign(data, process.env.JWT_TOKEN_SECRET!, { expiresIn });
  } catch (error) {
    logger.error(error);
    throw new Error("Error generating token");
  }
};

// Find token for a given user
export const findToken = async (
  userId: ObjectId,
  token: string
): Promise<TokenProps | null> => {
  try {
    return await TokenModel.findOne({ userId, token });
  } catch (error) {
    logger.error(error);
    throw new Error("Error finding token");
  }
};

// Generate user access token
export const generateAccessToken = (data: {
  _id: ObjectId;
  restaurantId?: ObjectId;
}) => generateToken(data, "30d");

// Generate Registration token for link
export const generateRegisterToken = (data: { email: string }) =>
  generateToken(data, "6h");

// Generate Reset Password token
export const generateResetPassToken = (data: { _id: ObjectId }) =>
  generateToken(data, "1h");

// Delete a token by its ID
export const deleteToken = async (tokenId: ObjectId): Promise<void> => {
  try {
    await TokenModel.deleteOne({ _id: tokenId });
  } catch (error) {
    logger.error(error);
    throw new Error("Error deleting token");
  }
};
