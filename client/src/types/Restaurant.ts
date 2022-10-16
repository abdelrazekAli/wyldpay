import { RegisteredUserProps } from "./UserProps";

export type RestaurantProps = {
  _id: string;
  logo: string;
  background: string;
  currency: string;
  vatNum: string;
  vatPercentage: number;
  categories: { value: string }[];
  userId: RegisteredUserProps;
};
