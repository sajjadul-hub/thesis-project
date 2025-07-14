/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    products: [],
    error: "",
    productquantity: 0,
    deliveryCharge: 50,
    medicineTotal: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].quantity +=
          action.payload.quantity;
      } else {
        state.products.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }

      state.productquantity += action.payload.quantity;
      state.medicineTotal +=
        action.payload.discountPrice * action.payload.quantity;
    },
    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      console.log(quantity, productId);
      const product = state.products.find(
        (product) => product._id === productId
      );
      console.log(quantity, state.products);
      if (!product) return;

      const updatedQuantity = product.quantity + quantity;
      console.log(updatedQuantity);
      if (updatedQuantity >= 1) {
        product.quantity = updatedQuantity;
        state.medicineTotal += quantity * product.discountPrice;
        state.productquantity += quantity;
      }
    },

    removeFromCart: (state, action) => {
      const removedProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (removedProduct) {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
        state.productquantity -= removedProduct.quantity;
        state.medicineTotal -=
          removedProduct.discountPrice * removedProduct.quantity;
      }
    },
    clearCart: (state) => {
      state.productquantity = null;
      state.products = [];
      state.medicineTotal = null;
    },
  },
});

export const { addToCart, updateProductQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
