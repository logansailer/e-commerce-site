import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  userInfo: null,
};

export const keebSlice = createSlice({
  name: "keeb",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.productData.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.productData.push(action.payload);
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
      if (item) {
        item.quantity++;
      }
    },
    subtractQuantity: (state, action) => {
      const item = state.productData.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity === 1 ? item.quantity : item.quantity--;
      }
    },
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  addQuantity,
  subtractQuantity,
} = keebSlice.actions;
export default keebSlice.reducer;
