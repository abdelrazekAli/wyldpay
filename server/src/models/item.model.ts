import mongoose, { ObjectId } from "mongoose";

export type ItemProps = {
  name: string;
  price: string;
  img: string;
  category: string;
  desc: string;
  restId: ObjectId;
};

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    desc: { type: String },
    restId: {
      type: mongoose.Types.ObjectId,
      ref: "restaurant",
      required: true,
    },
  },
  { versionKey: false }
);

const ItemModel = mongoose.model<ItemProps>("Item", itemSchema);

export default ItemModel;