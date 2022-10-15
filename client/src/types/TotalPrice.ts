import { DiscountProps } from "./Coupon";

export type TotalPriceProps = {
  subPrice: number;
  tip: number | null;
  discount: DiscountProps | null;
};
