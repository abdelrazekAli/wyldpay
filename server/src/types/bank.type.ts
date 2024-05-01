import { ObjectId } from "mongoose";

export type BankProps = {
  name: string;
  iban: string;
  bic: string;
  customerFees: Boolean;
  paymentsMethods?: { name: string; publicKey: string; secretKey: string }[];
  userId: ObjectId;
};
