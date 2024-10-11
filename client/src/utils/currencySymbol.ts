import { currencySymbols } from "../data/currencySymbols";

export const getSymbol = (currency: string) => {
  return currencySymbols[currency] || currencySymbols.default;
};
