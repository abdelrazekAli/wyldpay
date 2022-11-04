import mongoose, { ObjectId } from "mongoose";

export type RestaurantProps = {
  logo: string;
  background: string;
  currency: string;
  vatNum: string;
  vatPercentage: number;
  categories?: { value: string }[];
  userId: ObjectId;
};

const restaurantSchema = new mongoose.Schema(
  {
    logo: { type: String, required: true },
    background: { type: String, required: true },
    currency: { type: String, required: true, default: "eur" },
    vatNum: { type: String, required: true, default: "0000-0000" },
    vatPercentage: { type: Number, required: true, default: 19 },
    categories: { type: Array, default: [] },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const RestaurantModel = mongoose.model<RestaurantProps>(
  "Restaurant",
  restaurantSchema
);

export default RestaurantModel;
