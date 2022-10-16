import axios from "axios";
import { RootState } from "./store";
import { RestaurantProps } from "../types/Restaurant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  error: "",
} as {
  loading: boolean;
  data: RestaurantProps | null;
  error: string;
};

export const fetchRestaurant = createAsyncThunk(
  "restaurant/fetchByIdStatus",
  async (restaurantId: string) => {
    try {
      const response = await axios.get(`/api/v1/restaurants/${restaurantId}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurant.pending, (state) => {
      state.loading = true;
      state.data = null;
      state.error = "";
    });
    builder.addCase(fetchRestaurant.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchRestaurant.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      state.error = action.error.message!;
    });
  },
});

export const getRestaurantState = (state: RootState) => state.restaurant;
export const getRestaurantCurrency = (state: RootState) =>
  state.restaurant.data?.currency!;

export default restaurantSlice.reducer;
