import { RootState } from "./store";
import { RegisteredUserProps } from "../types/UserProps";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: JSON.parse(localStorage.getItem("user")!) || null,
  reducers: {
    login: (state, action: PayloadAction<RegisteredUserProps>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },

    updateUsername: (state, action: PayloadAction<string>) => {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state, firstName: action.payload })
      );
      return { ...state, firstName: action.payload };
    },

    logout: () => {
      localStorage.removeItem("user");
      return;
    },
  },
});

export const getUser = (state: RootState) => state.user;

export const { login, updateUsername, logout } = userSlice.actions;

export default userSlice.reducer;
