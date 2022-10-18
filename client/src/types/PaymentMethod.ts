export type PaymentMethod = {
  name: "stripe" | "paypal";
  publicKey: string;
  secretKey: string;
};

export type PaymentMethodsTypes = "Visa" | "PayPal" | "Apple pay";
