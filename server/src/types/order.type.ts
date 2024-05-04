import { ObjectId } from "mongoose";
import { ItemProps } from "./item.type";

export type OrderProps = {
  items: ItemProps[];
  totalPrice: number;
  paymentMethod: "PayPal" | "Visa" | "Apple pay";
  notes?: string;
  tip: number;
  discount: DiscountProps;
  tableNum: number;
  restId: ObjectId;
};
