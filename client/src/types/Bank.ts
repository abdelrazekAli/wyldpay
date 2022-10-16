import { PaymentMethod } from "./PaymentMethod";

export type BankProps = {
  name: string;
  iban: string;
  bic: string;
  customerFees: boolean;
  paymentsMethods?: PaymentMethod[];
};
