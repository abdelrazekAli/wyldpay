import { Router } from "express";
import {
  getCouponsByRestaurant,
  createCoupon,
  applyCoupon,
  deleteCoupon,
} from "../controllers/coupon.controller";
import { verifyAuth } from "../middlewares/verifyAuth.middleware";
import { validateIdMiddleware } from "../middlewares/validateId.middleware";

export const couponRouter = Router();

// Get all restaurant coupons by restaurant id
couponRouter.get("/", verifyAuth, getCouponsByRestaurant);

// Post new coupon
couponRouter.post("/", verifyAuth, createCoupon);

// Apply coupon
couponRouter.post(
  "/apply/:restId",
  validateIdMiddleware("restId"),
  applyCoupon
);

// Delete coupon
couponRouter.delete(
  "/:couponId",
  validateIdMiddleware("couponId"),
  verifyAuth,
  deleteCoupon
);
