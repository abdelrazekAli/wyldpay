import { ObjectId } from "mongoose";

export type OrderProps = {
  items: [];
  totalPrice: number;
  paymentMethod: "PayPal" | "Visa" | "Apple pay";
  notes?: string;
  tip: number;
  discount: DiscountProps;
  tableNum: number;
  restId: ObjectId;
};
