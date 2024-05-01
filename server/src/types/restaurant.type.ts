import { ObjectId } from "mongoose";

export type RestaurantProps = {
  logo: string;
  background: string;
  currency: string;
  vatNum: string;
  vatPercentage: number;
  categories?: { value: string }[];
  userId: ObjectId;
};
