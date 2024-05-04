import mongoose from "mongoose";
import { OrderProps } from "../types/order.type";

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
