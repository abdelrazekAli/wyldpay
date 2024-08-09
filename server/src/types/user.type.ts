import { JwtPayload } from "jsonwebtoken";

export type UserProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: number;
  city: string;
  state: string;
  zip: string;
  businessName: string;
  businessAddress: string;
  stripeCustomerId: string;
  socialLinks?: { name: string; value: string }[];
};

// To avoid property 'user' does not exist on type express Request error
declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}
