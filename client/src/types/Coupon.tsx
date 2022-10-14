export type DiscountProps = {
  name: string;
  type: "percentage" | "amount";
  value: number;
};

export type CouponType = DiscountProps & {
  _id: string;
  limit: number;
  usage: number;
  restId: string;
};
