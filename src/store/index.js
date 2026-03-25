import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authslice";
export const store = configureStore({
  reducer: {
    auth:authReducer,
    cart: cartReducer,
  },
});