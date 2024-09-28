import { Request, Response } from "express";
import CouponModel from "../models/coupon.model";
import { CouponProps } from "../types/coupon.type";
import { handleClientError, handleServerError } from "../utils/error.util";
import { handleValidationError } from "../utils/validation/helper.validation";
import {
  validateCouponData,
  validateApplyCoupon,
} from "../utils/validation/coupon.validation";

// Get all restaurant coupons by restaurant id
export const getCouponsByRestaurant = async (req: Request, res: Response) => {
  const { restaurantId } = req.user;

  try {
    const coupons = (await CouponModel.find(
      {
        restId: restaurantId,
      },
      { __v: 0 }
    )) as CouponProps[];

    // Response
    res.status(200).json(coupons);
  } catch (error: unknown) {
    handleServerError(res, error, "Failed to get restaurant coupons");
  }
};

// Post new coupon
export const createCoupon = async (req: Request, res: Response) => {
  const { restaurantId } = req.user;

  // Validate req body
  const { error, value: couponData } = validateCouponData(req.body);
  if (error) return handleValidationError(res, error);

  try {
    // Check if coupon already exists
    const couponCheck = await CouponModel.findOne({
      restId: restaurantId,
      name: couponData.name,
    });
    if (couponCheck) {
      return handleClientError(
        res,
        `Coupon: ${couponData.name} already exists`,
        409
      );
    }

    // Create new coupon
    const newCoupon = new CouponModel({ restId: restaurantId, ...couponData });

    // Save coupon
    const coupon = await newCoupon.save();

    // Response
    res.status(200).json(coupon);
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to create coupon");
  }
};

// Apply coupon
export const applyCoupon = async (req: Request, res: Response) => {
  try {
    const { restId } = req.params;

    // Validate req body
    const { error, value: couponData } = validateApplyCoupon(req.body);
    if (error) return handleValidationError(res, error);

    // Check coupon
    const coupon = await CouponModel.findOne({
      restId: restId,
      name: couponData.code,
    });

    if (!coupon) {
      return handleClientError(
        res,
        `Coupon: ${couponData.code} not found`,
        409
      );
    } else if (coupon.usage === coupon.limit) {
      return handleClientError(
        res,
        `Coupon: ${couponData.code} limit reached`,
        409
      );
    }

    // Update coupon usage
    const updatedCoupon = (await CouponModel.findByIdAndUpdate(
      coupon._id,
      { usage: coupon.usage + 1 },
      { new: true }
    ).select("-_id -limit -usage -restId")) as CouponProps;

    // Response
    res.status(200).json(updatedCoupon);
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to apply coupon");
  }
};

// Delete coupon
export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const { couponId } = req.params;

    // Delete coupon
    const result = await CouponModel.deleteOne({ _id: couponId });

    if (result.deletedCount === 0) {
      return handleClientError(
        res,
        `Coupon not found for deletion: ${couponId}`,
        404
      );
    }

    // Response
    res.status(200).json("Coupon deleted successfully");
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to delete coupon");
  }
};
