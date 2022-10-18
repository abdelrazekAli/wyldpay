import mongoose, { ObjectId } from "mongoose";

type DiscountProps = {
  name: string;
  type: "percentage" | "amount";
  value: number;
};

export type OrderProps = {
  items: [];
  totalPrice: number;
  paymentMethod: "PayPal" | "Visa" | "Apple pay";
  notes?: string;
  tip: number;
  discount: DiscountProps;
  tableNum: number;
  restId: ObjectId;
};

const orderSchema = new mongoose.Schema(
  {
    items: { type: [], required: true },
    totalPrice: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["PayPal", "Visa", "Apple pay"],
      required: true,
    },
    notes: { type: String },
    tableNum: { type: Number, required: true },
    tip: { type: Number },
    discount: { type: {} },
    restId: {
      type: mongoose.Types.ObjectId,
      ref: "restaurant",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const OrderModel = mongoose.model<OrderProps>("Order", orderSchema);

export default OrderModel;
