export type CouponType = {
  _id: string;
  name: string;
  type: "percentage" | "amount";
  value: number;
  limit: number;
  usage: number;
  restId: string;
};
