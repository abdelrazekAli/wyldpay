import { ProductType } from "./Product";
import { DiscountProps } from "./Coupon";

export type Order = {
  _id: string;
  tip?: number;
  notes?: string;
  createdAt: Date;
  tableNum: number;
  totalPrice: number;
  items: ProductType[];
  paymentMethod: string;
  discount?: DiscountProps;
};
