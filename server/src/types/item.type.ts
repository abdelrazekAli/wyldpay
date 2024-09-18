import { ObjectId } from "mongoose";

export type ItemProps = {
  _id: ObjectId;
  name: string;
  price: string;
  img: string;
  category: string;
  desc: string;
  ingredients: string;
  restId: ObjectId;
};
