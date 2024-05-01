import { ObjectId } from "mongoose";

export type CouponProps = {
  name: string;
  type: "percentage" | "amount";
  value: number;
  limit: number;
  usage: number;
  restId: ObjectId;
};
