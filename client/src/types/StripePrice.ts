export type StripePrice = {
  id: string;
  active: boolean;
  currency: string;
  unit_amount: number;
  nickname: string | null;
  product: string;
};
