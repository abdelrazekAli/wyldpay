import mongoose, { ObjectId } from "mongoose";

export type ItemProps = {
  name: string;
  price: string;
  img: string;
  category: string;
  desc: string;
  restId: ObjectId;
};

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  desc: { type: String, required: true },
  restId: {
    type: mongoose.Types.ObjectId,
    ref: "restaurant",
    required: true,
  },
});

const ItemModel = mongoose.model<ItemProps>("Item", itemSchema);

export default ItemModel;
