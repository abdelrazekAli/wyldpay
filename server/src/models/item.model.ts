import mongoose from "mongoose";
import { ItemProps } from "../types/item.type";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
    ingredients: { type: String, required: true },
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
