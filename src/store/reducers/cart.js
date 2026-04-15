import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

// ✅ helper to match exact product
const isSameItem = (a, b) =>
  a.id === b.id &&
  a.color === b.color &&
  a.size === b.size

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    // ✅ ADD PRODUCT
    addProduct: (state, action) => {
      const { product, count } = action.payload;

      const existItem = state.cartItems.find((item) =>
        isSameItem(item, product)
      );

      if (existItem) {
        // increase quantity
        existItem.quantity += count;
      } else {
        state.cartItems.push({
          ...product,
          quantity: count,
        });
      }
    },

    // ✅ REMOVE PRODUCT
    removeProduct: (state, action) => {
      const product = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => !isSameItem(item, product)
      );
    },

    // ✅ UPDATE QUANTITY
    setCount: (state, action) => {
      const { product, quantity } = action.payload;

      const item = state.cartItems.find((i) =>
        isSameItem(i, product)
      );

      if (item) {
        item.quantity = quantity;
      }
    },

    // ✅ CLEAR CART
    clearCart: (state) => {
      state.cartItems = [];
    },

    // ✅ SET FULL CART (for API/localStorage)
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  setCount,
  setCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;