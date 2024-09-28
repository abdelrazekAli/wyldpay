import { Router } from "express";
import {
  getCouponsByRestaurant,
  createCoupon,
  applyCoupon,
  deleteCoupon,
} from "../controllers/coupon.controller";
import { verifyAuth } from "../middlewares/verifyAuth.middleware";

export const couponRouter = Router();

// Get all restaurant coupons by restaurant id
couponRouter.get("/", verifyAuth, getCouponsByRestaurant);

// Post new coupon
couponRouter.post("/", verifyAuth, createCoupon);

// Apply coupon
couponRouter.post("/:restId", applyCoupon);

// Delete coupon
couponRouter.delete("/:couponId", verifyAuth, deleteCoupon);
