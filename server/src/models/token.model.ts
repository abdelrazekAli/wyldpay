import mongoose, { ObjectId } from "mongoose";

export type TokenProps = {
  token: string;
  userId: ObjectId;
  createdAt: Date;
};

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 18000,
  },
});

const TokenModel = mongoose.model<TokenProps>("ResetToken", tokenSchema);

export default TokenModel;
