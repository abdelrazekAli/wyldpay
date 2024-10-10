import BankModel from "../models/bank.model";
import UserModel from "../models/user.model";
import { BankProps } from "../types/bank.type";
import RestaurantModel from "../models/restaurant.model";

// fetch bank by userId
export const getBankByUserId = async (userId: string) => {
  const bank = (await BankModel.findOne({ userId }).select(
    "-_id -userId"
  )) as BankProps | null;
  if (!bank)
    throw new Error(`Bank information for user id: ${userId} not found`);
  return bank;
};

// create new bank
export const createBank = async (bankData: BankProps | {}) => {
  const newBank = new BankModel(bankData);
  await newBank.save();
  return newBank;
};

// fetch user and restaurant data by userId
export const getUserAndRestaurantData = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");

  const restaurant = await RestaurantModel.findOne({ userId }).select(
    "_id currency"
  );
  if (!restaurant) throw new Error("Restaurant not found");

  return { user, restaurant };
};

// update bank info
export const updateBankInfo = async (
  userId: string,
  bankData: Partial<BankProps>
) => {
  const updateResult = await BankModel.updateOne(
    { userId },
    { $set: bankData }
  );
  if (updateResult.modifiedCount === 0)
    throw new Error("Bank information not updated");
  return updateResult;
};

// update payment methods
export const updatePaymentMethods = async (
  userId: string,
  paymentsData: { name: string; publicKey: string; secretKey: string }
) => {
  const updateResult = await BankModel.updateOne(
    { userId },
    {
      $set: {
        "paymentsMethods.$[elem].publicKey": paymentsData.publicKey,
        "paymentsMethods.$[elem].secretKey": paymentsData.secretKey,
      },
    },
    { arrayFilters: [{ "elem.name": paymentsData.name }] }
  );
  if (updateResult.modifiedCount === 0)
    throw new Error("Payment method not found");
  return updateResult;
};
