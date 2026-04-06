
"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "../store/reducers/cart";
import authReducer from "./authslice";

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

// Persist config
const persistConfig = {
  key: "shoppingcart",
  storage,
  whitelist: ["cart", "user"],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // IMPORTANT for redux-persist
    }),
});

// Persistor
export const persistor = persistStore(store);