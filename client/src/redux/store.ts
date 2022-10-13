import cart from "./cart.slice";
import user from "./user.slice";
import restaurant from "./restaurant.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    cart,
    user,
    restaurant,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
