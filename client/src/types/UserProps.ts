export type UserProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  businessName: string;
  businessAddress: string;
  city: string;
  state: string;
  zip: string;
  vatNum?: string;
  vatPercentage?: number;
  password?: string;
  confirmPassword?: string;
  socialLinks?: { name: string; value: string }[];
};

export type RegisteredUserProps = UserProps & {
  _id?: string;
  restaurantId?: string;
  currency?: string;
  accessToken?: string;
  refreshToken?: string;
};
