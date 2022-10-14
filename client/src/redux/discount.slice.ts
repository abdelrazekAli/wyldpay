import { RootState } from "./store";
import { DiscountProps } from "../types/Coupon";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const discountSlice = createSlice({
  name: "discount",
  initialState: null as DiscountProps | null,
  reducers: {
    addDiscount: (state, action: PayloadAction<DiscountProps>) => {
      return action.payload;
    },
  },
});

export const getDiscount = (state: RootState) => state.discount;

export const { addDiscount } = discountSlice.actions;

export default discountSlice.reducer;
