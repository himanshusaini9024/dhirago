import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

// find same product (id + color + size)
const indexSameProduct = (state, action) => {
  const sameProduct = (product) =>
    product.id === action.id &&
    product.color === action.color &&
    product.size === action.size;

  return state.cartItems.findIndex(sameProduct);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { product, count } = action.payload;

      const index = state.cartItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size,
      );

      if (index !== -1) {
        state.cartItems[index].count += count;
      } else {
        state.cartItems.push({
          ...product,
          count,
        });
      }
    },

    removeProduct: (state, action) => {
      const index = indexSameProduct(state, action.payload);
      if (index !== -1) {
        state.cartItems.splice(index, 1);
      }
    },

     clearCart: (state) => {
      state.cartItems = [];
    },

    setCount: (state, action) => {
      const { product, count } = action.payload;

      const index = indexSameProduct(state, product);

      if (index !== -1) {
        state.cartItems[index].count = count;
      }
    },
      setCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { addProduct, removeProduct, setCount, setCart,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
