import CouponModel from "../models/coupon.model";
import { CouponProps } from "../types/coupon.type";
import { Request, Response, Router } from "express";
import { verifyAuth } from "../services/auth.service";
import { handleClientError, handleServerError } from "../utils/error";
import { validateRestaurantId } from "../utils/validation/Id.validation";
import { handleValidationError } from "../utils/validation/helper.validation";
import {
  validateCouponData,
  validateApplyCoupon,
} from "../utils/validation/coupon.validation";

export const couponRouter = Router();

// Get all restaurant coupons by restaurant id
couponRouter.get("/", verifyAuth, async (req: Request, res: Response) => {
  const { restaurantId } = req.user;

  try {
    // Check restaurant id
    const checkResult = (await validateRestaurantId(restaurantId)) as
      | string
      | null;
    if (checkResult === "string") {
      return handleClientError(res, `Invalid restaurant ID: ${restaurantId}`);
    }

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
});

// Post new coupon
couponRouter.post("/", verifyAuth, async (req: Request, res: Response) => {
  const { restaurantId } = req.user;

  // Validate req body
  let validationResult = validateCouponData(req.body);
  if (validationResult) return handleValidationError(res, validationResult);

  try {
    // Check if coupon already exists
    const couponCheck = await CouponModel.findOne({
      restId: restaurantId,
      name: req.body.name,
    });
    if (couponCheck) {
      return handleClientError(
        res,
        `Coupon: ${req.body.name} already exists`,
        409
      );
    }

    // Create new coupon
    const newCoupon = new CouponModel({ restId: restaurantId, ...req.body });

    // Save coupon
    const coupon = (await newCoupon.save()) as CouponProps;

    // Response
    res.status(201).json(coupon);
  } catch (error: unknown) {
    return handleServerError(res, error, "Failed to create coupon");
  }
});

// Apply coupon
couponRouter.post("/:restId", async (req: Request, res: Response) => {
  try {
    const { restId } = req.params;
    const { couponCode } = req.body;

    // Validate req body
    let validationResult = validateApplyCoupon(req.body);
    if (validationResult) return handleValidationError(res, validationResult);

    // Check coupon
    const coupon = await CouponModel.findOne({
      restId: restId,
      name: couponCode,
    });

    if (!coupon) {
      return handleClientError(res, `Coupon: ${couponCode} not found`, 409);
    } else if (coupon.usage === coupon.limit) {
      return handleClientError(res, `Coupon: ${couponCode} limit reached`, 409);
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
});

// Delete coupon
couponRouter.delete(
  "/:couponId",
  verifyAuth,
  async (req: Request, res: Response) => {
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
  }
);
