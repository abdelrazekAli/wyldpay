import { RootState } from "./store";
import { ProductType } from "../types/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartProductType = ProductType & { quantity: number };

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartProductType[],
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const productIndex = state?.findIndex(
        (product) => product._id === action.payload._id
      );

      if (productIndex !== -1 && state[productIndex]) {
        state[productIndex].quantity += 1;
      } else {
        state?.push({ ...action.payload, quantity: 1 });
      }
    },

    decreseFromCart: (state, action: PayloadAction<number>) => {
      const product = state?.find((product) => product._id === action.payload);

      const productIndex = state.findIndex(
        (product) => product._id === action.payload
      );

      if (product?.quantity === 1) {
        return state?.filter((product) => product._id !== action.payload);
      } else {
        state[productIndex].quantity -= 1;
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const filterState = state.filter(
        (product) => product._id !== action.payload
      );

      return filterState;
    },
  },
});

export const getCartProducts = (state: RootState) => state.cart;

export const getTotalPrice = (state: RootState) =>
  state.cart?.reduce((acc, next) => (acc += next.quantity * next.price), 0);

export const getTotalQuantiy = (state: RootState) =>
  state.cart?.reduce((acc, next) => (acc += next.quantity), 0);

export const { addToCart, decreseFromCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
