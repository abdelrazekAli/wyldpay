import mongoose, { ObjectId } from "mongoose";

export type BankProps = {
  name: string;
  iban: string;
  bic: string;
  customerFees: Boolean;
  paymentsMethods?: { name: string; publicKey: string; secretKey: string }[];
  userId: ObjectId;
};

const bankSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    iban: { type: String, required: true },
    bic: { type: String, required: true },
    customerFees: { type: Boolean, required: true, default: false },
    paymentsMethods: {
      type: [{ name: String, publicKey: String, secretKey: String }],
      default: [
        { name: "stripe", publicKey: "", secretKey: "" },
        { name: "paypal", publicKey: "", secretKey: "" },
      ],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const BankModel = mongoose.model<BankProps>("Bank", bankSchema);

export default BankModel;
