import { Response } from "express";
import { ObjectId } from "mongoose";
import logger from "../config/logger.config";
import TokenModel from "../models/token.model";
import { TokenProps } from "../types/token.type";
import { generateToken } from "../utils/token.util";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { handleClientError, handleServerError } from "../utils/error.util";

// Find token for a given user
export const findToken = async (
  userId: ObjectId,
  token: string
): Promise<TokenProps | null> => {
  try {
    return await TokenModel.findOne({ userId, token });
  } catch (error: unknown) {
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
  } catch (error: unknown) {
    logger.error(error);
    throw new Error("Error deleting token");
  }
};

// Save reset yoken
export const saveResetToken = async (userId: ObjectId, resetToken: string) => {
  const newToken = new TokenModel({
    userId,
    token: resetToken,
  });
  return await newToken.save();
};

// Check token errors
export const catchTokenErrors = (res: Response, error: any) => {
  if (error instanceof TokenExpiredError) {
    return handleClientError(res, "Access Token was expired!", 403);
  } else if (error instanceof JsonWebTokenError) {
    return handleClientError(res, "Invalid token.", 498);
  }
  return handleServerError(res, error);
};
