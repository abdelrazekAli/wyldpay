import { RootState } from "./store";
import { mainProducts } from "../dummyData";
import { ProductType } from "../types/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProductType[] = mainProducts;

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<ProductType>) => {
      return [action.payload, ...state];
    },
  },
});

export const { addProducts } = productsSlice.actions;

export const getProductsSelector = (state: RootState) => state.products;

export default productsSlice.reducer;
