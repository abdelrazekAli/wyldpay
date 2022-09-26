import mongoose, { ObjectId } from "mongoose";

export type OrderProps = {
  items: string[];
  price: string;
  notes?: string;
  tableNum: number;
  restId: ObjectId;
};

const orderSchema = new mongoose.Schema(
  {
    items: { type: [String], required: true },
    price: { type: Number, required: true },
    notes: { type: String },
    tableNum: { type: Number, required: true },
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
