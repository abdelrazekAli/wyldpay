import { ObjectId } from "mongoose";

export type TokenProps = {
  _id: ObjectId;
  token: string;
  userId: ObjectId;
  createdAt: Date;
};
