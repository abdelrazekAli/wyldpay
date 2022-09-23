import mongoose, { ObjectId } from "mongoose";

export type CouponProps = {
  name: string;
  type: "percentage" | "amount";
  value: number;
  limit: number;
  usage: number;
  restId: ObjectId;
};

const couponSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: ["percentage", "amount"], required: true },
    value: { type: Number, required: true },
    limit: { type: Number, required: true },
    usage: { type: Number, default: 0 },
    restId: {
      type: mongoose.Types.ObjectId,
      ref: "restaurant",
      required: true,
    },
  },
  { versionKey: false }
);

const CouponModel = mongoose.model<CouponProps>("Coupon", couponSchema);

export default CouponModel;
