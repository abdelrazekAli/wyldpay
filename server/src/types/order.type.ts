import { ObjectId } from "mongoose";
import { ItemProps } from "./item.type";
import { DiscountProps } from "./discount.type";

export type OrderProps = {
  _id: ObjectId;
  items: ItemProps[];
  totalPrice: number;
  paymentMethod: "PayPal" | "Visa" | "Apple pay";
  notes?: string;
  tip: number;
  discount: DiscountProps;
  tableNum: number;
  restId: ObjectId;
};
