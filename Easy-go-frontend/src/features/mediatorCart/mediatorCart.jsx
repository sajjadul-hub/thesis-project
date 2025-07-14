/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

export const mediatorCartSlice = createSlice({
  name: "mediatorCart",
  initialState: {
    isLoading: false,
    error: "",
    mediatorCart: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    mediatorToCart: (state, action) => {
      const existingProductIndex = state.mediatorCart.findIndex(
        (mediatorCart) => mediatorCart._id === action.payload._id
      );
      if (existingProductIndex !== -1) {
        state.mediatorCart[existingProductIndex].quantity +=
          action.payload.quantity;
      } else {
        state.mediatorCart.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }

      state.quantity += action.payload.quantity;
      state.total += action.payload.discountPrice * action.payload.quantity;
    },

    updateMediatorQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const mediatorCart = state.mediatorCart.find(
        (product) => product._id === productId
      );
      if (!mediatorCart) return;

      const updatedQuantity = mediatorCart.quantity + quantity;
      if (updatedQuantity >= 1) {
        mediatorCart.quantity = updatedQuantity;
        state.total += quantity * mediatorCart.discountPrice;
        state.quantity += quantity;
      }
    },
    mediatoremoveCart: (state, action) => {
      const removedProduct = state.mediatorCart.find(
        (mediatorCart) => mediatorCart._id === action.payload._id
      );
      if (removedProduct) {
        state.mediatorCart = state.mediatorCart.filter(
          (product) => product._id !== action.payload._id
        );
        state.quantity -= removedProduct.quantity;
        state.total -= removedProduct.discountPrice * removedProduct.quantity;
      }
    },
    mediatorclearCart: (state) => {
      state.quantity = null;
      state.mediatorCart = [];
      state.total = null;
    },
  },
});

export const {
  mediatorToCart,
  updateMediatorQuantity,
  mediatoremoveCart,
  mediatorclearCart,
} = mediatorCartSlice.actions;
export default mediatorCartSlice.reducer;
