import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  itemCount: 0,
  data: [],
};

const cartSlice = createSlice({
  name: "Cart",
  initialState: initialCartState,
  reducers: {
    increaseCountByOne: (state) => {
      state.itemCount += 1;
    },
    increaseCountByAmount: (state, action) => {
      state.itemCount += action.payload;
    },
    decreaseCountByOne: (state) => {
      if (state.itemCount > 0) state.itemCount -= 1;
    },
    resetCartCount: (state) => {
      state.itemCount = 0;
    },
    addDatatoCart: (state, action) => {
      state.data = action.payload;
    },
    removeDatafromCart: (state) => {
      state.data = [];
    },
    removeitemfromCart: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  increaseCountByAmount,
  increaseCountByOne,
  resetCartCount,
  addDatatoCart,
  removeDatafromCart,
  removeitemfromCart,
  decreaseCountByOne,
} = cartSlice.actions;

export default cartSlice.reducer;
