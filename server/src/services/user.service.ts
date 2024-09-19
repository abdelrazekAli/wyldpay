import { Document } from "mongoose";
import logger from "../utils/logger";
import UserModel from "../models/user.model";
import { UserProps } from "../types/user.type";
import { hashPassword } from "../utils/password";

// Create new user
export const createNewUser = async (
  data: UserProps
): Promise<UserProps & Document> => {
  try {
    data.password = await hashPassword(data.password); // Hash user password
    const newUser = new UserModel(data);
    return newUser.save(); // Save user to database
  } catch (error: any) {
    logger.error(`Error creating new user: ${error.message}`);
    throw new Error("Failed to create user");
  }
};

// Find user by email
export const findUserByEmail = async (
  email: string
): Promise<(UserProps & Document) | null> => {
  try {
    return UserModel.findOne({ email });
  } catch (error: any) {
    logger.error(`Error finding user by email: ${error.message}`);
    throw new Error("Failed to find user by email");
  }
};

// Find user by ID
export const findUserById = async (
  id: string
): Promise<(UserProps & Document) | null> => {
  try {
    return UserModel.findById(id);
  } catch (error: any) {
    logger.error(`Error finding user by ID: ${error.message}`);
    throw new Error("Failed to find user by ID");
  }
};
