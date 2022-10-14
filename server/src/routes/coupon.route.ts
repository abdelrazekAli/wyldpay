import { Router } from "express";
import { Request, Response } from "express";
import CouponModel, { CouponProps } from "../models/coupon.model";
import { verifyAuth } from "../middlewares/token.auth.middleware";
import {
  checkRestId,
  validateApplyCoupon,
  validateCoupon,
} from "../utils/validation";

export const couponRouter = Router();

// Get all restaurant coupons by restaurant id
couponRouter.get("/", verifyAuth, async (req: Request, res: Response) => {
  const { restaurantId } = req.user;
  try {
    // Check restaurant id
    const checkResult = (await checkRestId(restaurantId)) as string | null;
    if (checkResult === "string") return res.status(400).send(checkResult);

    const coupons = (await CouponModel.find(
      {
        restId: restaurantId,
      },
      { __v: 0 }
    )) as CouponProps[];

    // Response
    res.status(200).json(coupons);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Post new coupon
couponRouter.post("/", verifyAuth, async (req: Request, res: Response) => {
  const { restaurantId } = req.user;

  // Validate req body
  let validationResult = validateCoupon(req.body);
  if (validationResult)
    return res.status(400).send(validationResult.details[0].message);

  try {
    // Check if coupon already exist
    const couponCheck = await CouponModel.findOne({
      restId: restaurantId,
      name: req.body.name,
    });
    if (couponCheck) return res.status(409).send("Coupon is already used");

    // Create new coupon
    const newCoupon = new CouponModel({ restId: restaurantId, ...req.body });

    // Save coupon
    const coupon = (await newCoupon.save()) as CouponProps;

    // Response
    res.status(200).json(coupon);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Apply coupon
couponRouter.post("/:restId", async (req: Request, res: Response) => {
  try {
    const { restId } = req.params,
      { couponCode } = req.body;

    // Validate req body
    let validationResult = validateApplyCoupon(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Check coupon
    const coupon = await CouponModel.findOne({
      restId: restId,
      name: couponCode,
    });

    if (!coupon) return res.status(409).send("Coupon is not valid");
    else if (coupon.usage === coupon.limit)
      return res.status(409).send("Coupon limit is out");

    // Update coupon usage
    const updatedCoupon = (await CouponModel.findByIdAndUpdate(
      coupon._id,
      { usage: coupon.usage + 1 },
      { new: true }
    ).select("-_id -limit -usage -restId")) as CouponProps;

    // Response
    res.status(200).json(updatedCoupon);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
      await CouponModel.deleteOne({ _id: couponId });

      // Response
      res.status(200).json(`Coupon deleted successfully`);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);
