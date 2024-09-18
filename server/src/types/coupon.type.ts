import { ObjectId } from "mongoose";

export type CouponProps = {
  _id: ObjectId;
  name: string;
  type: "percentage" | "amount";
  value: number;
  limit: number;
  usage: number;
  restId: ObjectId;
};
