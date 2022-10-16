export type PaymentMethod = {
  name: "stripe" | "paypal";
  publicKey: string;
  secretKey: string;
};
