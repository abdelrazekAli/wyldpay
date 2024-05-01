import { ObjectId } from "mongoose";

export type ItemProps = {
  name: string;
  price: string;
  img: string;
  category: string;
  desc: string;
  ingredients: string;
  restId: ObjectId;
};
