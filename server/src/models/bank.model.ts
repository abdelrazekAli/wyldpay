import mongoose, { ObjectId } from "mongoose";

export type BankProps = {
  name: string;
  iban: string;
  bic: string;
  userId: ObjectId;
};

const bankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  iban: { type: String, required: true },
  bic: { type: String, required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const BankModel = mongoose.model<BankProps>("Bank", bankSchema);

export default BankModel;
