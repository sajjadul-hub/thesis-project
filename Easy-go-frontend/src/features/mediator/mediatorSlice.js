/* eslint-disable no-dupe-keys */
import { createSlice } from "@reduxjs/toolkit";

export const parcelSlice = createSlice({
  name: "mediator",
  initialState: {
    isLoading: false,
    mediators: [],
    mediatorsOrder: [],
    mediatorCategory: [],
    mediator: {},
    orders: {},
    error: "",
  },

  reducers: {
    //Get Mediator
    getMediatorsStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    getMediatorsSuccess: (state, action) => {
      state.isLoading = false;
      state.mediators = action.payload;
    },
    getMediatosrFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //Get mediator
    getMediatorStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    getMediatorSuccess: (state, action) => {
      state.isLoading = false;
      state.mediator = action.payload;
    },
    getMediatorFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //Get mediatorOrder
    getMediatorsOrderStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    getMediatorsOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.mediatorsOrder = action.payload;
    },
    getMediatorsOrderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // mediator category
    getMediatorCategoryStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    getMediatorCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.mediatorCategory = action.payload;
    },
    getMediatorCategoryFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // order reducer
    addOrdersStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    addOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    },
    addOrdersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getMediatorsStart,
  getMediatorsSuccess,
  getMediatorsFailure,
  getMediatorStart,
  getMediatorSuccess,
  getMediatorFailure,
  getMediatorCategoryStart,
  getMediatorCategorySuccess,
  getMediatorCategoryFailure,
  getMediatorsOrderStart,
  getMediatorsOrderSuccess,
  getMediatorsOrderFailure,
  addOrdersStart,
  addOrderSuccess,
  addOrdersFailure,
} = parcelSlice.actions;
export default parcelSlice.reducer;
