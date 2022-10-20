import { RootState } from "./store";
import { createSlice } from "@reduxjs/toolkit";

const layoutsSlice = createSlice({
  name: "layout",
  initialState: { sidebar: false } as { sidebar: boolean },
  reducers: {
    toggleSidebar: (state) => {
      return { sidebar: !state.sidebar };
    },
  },
});

export const getLayouts = (state: RootState) => state.layout;

export const { toggleSidebar } = layoutsSlice.actions;

export default layoutsSlice.reducer;
