import { ObjectId } from "mongoose";

export type DiscountProps = {
  _id: ObjectId;
  name: string;
  type: "percentage" | "amount";
  value: number;
};
