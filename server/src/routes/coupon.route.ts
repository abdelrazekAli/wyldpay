import logger from "../utils/logger";
import CouponModel from "../models/coupon.model";
import { CouponProps } from "../types/coupon.type";
import { handleServerError } from "../utils/error";
import { Request, Response, Router } from "express";
import { verifyAuth } from "../services/auth.service";
import { validateRestaurantId } from "../utils/validation/Id.validation";
import { handleValidationError } from "../utils/validation/helper.validation";
import {
  validateCoupon,
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
      logger.warn(`Invalid restaurant ID: ${restaurantId}`);
      return res.status(400).send(checkResult);
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
    handleServerError(res, error, "Failed to get coupons");
  }
});

// Post new coupon
couponRouter.post("/", verifyAuth, async (req: Request, res: Response) => {
  const { restaurantId } = req.user;

  // Validate req body
  let validationResult = validateCoupon(req.body);
  if (validationResult) return handleValidationError(res, validationResult);

  try {
    // Check if coupon already exists
    const couponCheck = await CouponModel.findOne({
      restId: restaurantId,
      name: req.body.name,
    });
    if (couponCheck) {
      logger.warn(`Coupon already exists: ${req.body.name}`);
      return res.status(409).send("Coupon is already used");
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
    if (validationResult) {
      logger.warn(
        `Coupon validation failed: ${validationResult.details[0].message}`
      );
      return res.status(400).send(validationResult.details[0].message);
    }

    // Check coupon
    const coupon = await CouponModel.findOne({
      restId: restId,
      name: couponCode,
    });

    if (!coupon) {
      logger.warn(`Coupon not found: ${couponCode}`);
      return res.status(409).send("Coupon is not valid");
    } else if (coupon.usage === coupon.limit) {
      logger.warn(`Coupon limit reached: ${couponCode}`);
      return res.status(409).send("Coupon limit is out");
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
        logger.warn(`Coupon not found for deletion: ${couponId}`);
        return res.status(404).json("Coupon not found");
      }

      // Response
      res.status(200).json("Coupon deleted successfully");
    } catch (error: unknown) {
      return handleServerError(res, error, "Failed to delete coupon");
    }
  }
);
