import mongoose from "mongoose";

export type UserProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: number;
  city: string;
  state: string;
  zip: string;
  businessName: string;
  businessAddress: string;
};

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    businessName: { type: String, required: true },
    businessAddress: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserProps>("User", userSchema);

export default UserModel;