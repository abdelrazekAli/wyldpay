import mongoose from "mongoose";

export type TokenProps = {
  token: string;
};

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
});

const RefreshTokenModel = mongoose.model<TokenProps>(
  "RefreshToken",
  tokenSchema
);

export default RefreshTokenModel;
