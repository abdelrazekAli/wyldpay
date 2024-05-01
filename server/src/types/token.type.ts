import { ObjectId } from "mongoose";

export type TokenProps = {
  token: string;
  userId: ObjectId;
  createdAt: Date;
};
