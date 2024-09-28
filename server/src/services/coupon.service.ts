import CouponModel from "../models/coupon.model";
import { CouponProps } from "../types/coupon.type";

// Fetch all coupons by restaurant ID
export const getCouponsByRestaurantId = async (restaurantId: string) => {
  return (await CouponModel.find(
    { restId: restaurantId },
    { __v: 0 }
  )) as CouponProps[];
};
