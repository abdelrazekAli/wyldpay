import { ObjectId } from "mongoose";
import CouponModel from "../models/coupon.model";
import { CouponProps } from "../types/coupon.type";

// Fetch all coupons by restaurant id
export const fetchCouponsByRestaurant = async (restaurantId: string) => {
  return (await CouponModel.find(
    { restId: restaurantId },
    { __v: 0 }
  )) as CouponProps[];
};

// Check if a coupon already exists
export const checkCouponExists = async (
  restaurantId: string,
  couponName: string
) => {
  return (await CouponModel.findOne({
    restId: restaurantId,
    code: couponName,
  })) as CouponProps | null;
};

// Save a new coupon
export const saveNewCoupon = async (couponData: CouponProps) => {
  const newCoupon = new CouponModel(couponData);
  return await newCoupon.save();
};

// update coupon usage
export const updateCouponUsage = async (couponId: ObjectId, usage: number) => {
  return (await CouponModel.findByIdAndUpdate(
    couponId,
    { usage: usage + 1 },
    { new: true }
  ).select("-_id -limit -usage -restId")) as CouponProps;
};

// Delete coupon
export const removeCoupon = async (couponId: string) => {
  await CouponModel.deleteOne({ _id: couponId });
};
