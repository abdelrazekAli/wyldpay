import { ObjectId } from "mongoose";
import TokenModel from "../models/token.model";
import { TokenProps } from "../types/token.type";

// Find token for a given user and token value
export const findToken = async (
  userId: ObjectId,
  token: string
): Promise<TokenProps | null> => {
  return await TokenModel.findOne({ userId, token });
};

// Delete a token by its ID
export const deleteToken = async (tokenId: ObjectId): Promise<void> => {
  await TokenModel.deleteOne({ _id: tokenId });
};
