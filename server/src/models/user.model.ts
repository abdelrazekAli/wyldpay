import mongoose from "mongoose";
import { UserProps } from "../types/user.type";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    businessName: { type: String, required: true },
    businessAddress: { type: String, required: true },
    stripeCustomerId: {
      type: String,
      required: true,
    },
    socialLinks: {
      type: [{ name: String, value: String }],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model<UserProps>("User", userSchema);

export default UserModel;
