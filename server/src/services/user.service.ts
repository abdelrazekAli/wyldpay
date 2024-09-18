import { Document } from "mongoose";
import UserModel from "../models/user.model";
import { UserProps } from "../types/user.type";
import { hashPassword } from "../utils/password";

// Create new user
export const createUser = async (
  data: UserProps
): Promise<UserProps & Document> => {
  data.password = await hashPassword(data.password); // Hash user password
  const newUser = new UserModel(data);
  return await newUser.save(); // Save user to database
};

// Find user by email
export const findUserByEmail = async (
  email: string
): Promise<(UserProps & Document) | null> => {
  return await UserModel.findOne({ email });
};

// Find user by ID
export const findUserById = async (
  id: string
): Promise<(UserProps & Document) | null> => {
  return await UserModel.findById(id);
};
