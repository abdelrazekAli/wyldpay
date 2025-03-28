export type UserProps = {
  _id?: string;
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
  stripeCustomerId?: string;
  socialLinks?: { name: string; value: string }[];
};

export type AuthUserProps = {
  email: string;
  password: string;
};

export type RegisteredUserProps = UserProps & {
  _id?: string;
  restaurantId?: string;
  currency?: string;
  accessToken?: string;
  refreshToken?: string;
  API_VERSION: string;
};

export type socialLinksProps = {
  google: string;
  youtube: string;
  twitter: string;
  telegram: string;
  instagram: string;
};
