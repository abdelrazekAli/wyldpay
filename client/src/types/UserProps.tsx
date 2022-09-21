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
  password?: string;
  confirmPassword?: string;
};

export type RegisteredUserProps = {
  _id?: string;
  firstName?: string;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
};
