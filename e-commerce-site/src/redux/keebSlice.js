import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [], // cart items
  userInfo: null, // { username }
};

export const keebSlice = createSlice({
  name: "keeb",
  initialState,
  reducers: {
    // cart reducers
    addToCart: (state, action) => {
      const item = state.productData.find((it) => it.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity ?? 1;
      } else {
        state.productData.push({ ...action.payload });
      }
    },
    deleteItem: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productData = [];
    },
    addQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item.id === action.payload.id
      );
      if (item) item.quantity++;
    },
    subtractQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        if (item.quantity > 1) item.quantity--;
      }
    },

    // user and cart sync reducers
    setUser: (state, action) => {
      state.userInfo = action.payload; // { username }
    },
    clearUser: (state) => {
      state.userInfo = null;
    },
    setCart: (state, action) => {
      state.productData = action.payload; // replace cart
    },
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  addQuantity,
  subtractQuantity,
  setUser,
  clearUser,
  setCart,
} = keebSlice.actions;
export default keebSlice.reducer;
