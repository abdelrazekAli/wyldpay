import { Document } from "mongoose";
import UserModel from "../models/user.model";
import { UserProps } from "../types/user.type";
import { hashPassword } from "../utils/password.util";

// Find user by ID
export const findUserById = async (
  id: string
): Promise<(UserProps & Document) | null> => {
  return await UserModel.findById(id).select("-password");
};

// Find user by email
export const findUserByEmail = async (
  email: string
): Promise<(UserProps & Document) | null> => {
  return await UserModel.findOne({ email });
};

// Create new user
export const createNewUser = async (
  data: UserProps
): Promise<UserProps & Document> => {
  data.password = await hashPassword(data.password); // Hash user password
  const newUser = new UserModel(data);
  return newUser.save(); // Save user to database
};

// Update user by ID
export const modifyUserById = async (
  userId: string,
  userData: UserProps
): Promise<UserProps | null> => {
  const updatedUser = (await UserModel.findByIdAndUpdate(
    userId,
    { $set: userData },
    { runValidators: true, new: true }
  ).select("-password -createdAt -updatedAt")) as UserProps | null;

  return updatedUser;
};
