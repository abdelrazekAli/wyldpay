import { RootState } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const tipSlice = createSlice({
  name: "tip",
  initialState: null as number | null,
  reducers: {
    addTip: (state, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
});

export const getTip = (state: RootState) => state.tip;

export const { addTip } = tipSlice.actions;

export default tipSlice.reducer;
