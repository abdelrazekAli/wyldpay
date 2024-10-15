import { Response } from "express";
import { ObjectId } from "mongoose";
import { generateToken } from "../utils/token.util";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { handleClientError, handleServerError } from "../utils/error.util";

// Generate user access token
export const generateAccessToken = (data: {
  _id: ObjectId;
  restaurantId?: ObjectId;
}) => generateToken(data, "7d");

// Generate Registration token for link
export const generateRegisterToken = (data: { email: string }) =>
  generateToken(data, "6h");

// Generate Reset Password token
export const generateResetPassToken = (data: { _id: ObjectId }) =>
  generateToken(data, "1h");

// Check token errors
export const catchTokenErrors = (res: Response, error: any) => {
  if (error instanceof TokenExpiredError) {
    return handleClientError(res, "Access Token was expired!", 403);
  } else if (error instanceof JsonWebTokenError) {
    return handleClientError(res, "Invalid token.", 498);
  }
  return handleServerError(res, error);
};
