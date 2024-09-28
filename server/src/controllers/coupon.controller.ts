import { Request, Response } from "express";
import { CouponProps } from "../types/coupon.type";
import { handleClientError, handleServerError } from "../utils/error.util";
import { handleValidationError } from "../utils/validation/helper.validation";
import {
  validateCouponData,
  validateApplyCoupon,
} from "../utils/validation/coupon.validation";
import {
  checkCouponExists,
  fetchCouponsByRestaurant,
  removeCoupon,
  saveNewCoupon,
  updateCouponUsage,
} from "../services/coupon.service";

// Get all restaurant coupons by restaurant id
export const getCouponsByRestaurant = async (req: Request, res: Response) => {
  const { restaurantId } = req.user;

  try {
    // Fetch all coupons by restaurant id
    const coupons = (await fetchCouponsByRestaurant(
      restaurantId
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
    const coupon = await checkCouponExists(restaurantId, couponData.code);
    if (coupon) {
      return handleClientError(
        res,
        `Coupon: ${couponData.code} already exists`,
        409
      );
    }

    // Save new coupon
    const newCoupon = await saveNewCoupon({
      restId: restaurantId,
      ...couponData,
    });

    // Response
    res.status(200).json(newCoupon);
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
    const coupon = await checkCouponExists(restId, couponData.code);

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
    const updatedCoupon = await updateCouponUsage(coupon._id, coupon.usage);

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
    await removeCoupon(couponId);

    // Response
    res.status(200).json("Coupon deleted successfully");
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to delete coupon");
  }
};
