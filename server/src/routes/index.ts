// Import all route files
import { Router } from "express";
import { authRouter } from "./auth.route";
import { bankRouter } from "./bank.route";
import { itemRouter } from "./item.route";
import { userRouter } from "./user.route";
import { orderRouter } from "./order.route";
import { emailRouter } from "./email.route";
import { couponRouter } from "./coupon.route";
import { paymentRouter } from "./payment.route";
import { restaurantRouter } from "./restaurant.route";
import { subscriptionRouter } from "./subscription.route";

// Create a new router instance
const router = Router();

// Use all route files
router.use("/auth", authRouter);
router.use("/banks", bankRouter);
router.use("/items", itemRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/emails", emailRouter);
router.use("/coupons", couponRouter);
router.use("/payments", paymentRouter);
router.use("/restaurants", restaurantRouter);
router.use("/subscriptions", subscriptionRouter);

// Export the router
export default router;
