import { ObjectId } from "mongoose";

export type RestaurantProps = {
  _id: ObjectId;
  logo: string;
  background: string;
  currency: string;
  vatNum: string;
  vatPercentage: number;
  categories?: { value: string }[];
  userId: ObjectId;
};
