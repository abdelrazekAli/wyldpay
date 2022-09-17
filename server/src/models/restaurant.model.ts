import mongoose, { ObjectId } from "mongoose";

export type RestaurantProps = {
  name: string;
  logo: string;
  currency: string;
  categories: { value: string }[];
  userId: ObjectId;
};

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  currency: { type: String, required: true },
  categories: { type: Array },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const RefreshTokenModel = mongoose.model<RestaurantProps>(
  "Restaurant",
  restaurantSchema
);

export default RefreshTokenModel;
