import { createSlice } from "@reduxjs/toolkit";

export const parcelSlice = createSlice({
  name: "medicine",
  initialState: {
    isLoading: false,
    medicines: [],
    medicinesOrder: [],
    medicine: {},
    orders: {},
    error: "",
  },

  reducers: {
    //Get Medicines
    getMedicinesStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    getMedicinesSuccess: (state, action) => {
      state.isLoading = false;
      state.medicines = action.payload;
    },
    getMedicinesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //Get Medicine
    getMedicineStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    getMedicineSuccess: (state, action) => {
      state.isLoading = false;
      state.medicine = action.payload;
    },
    getMedicineFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //Get MedicineOrder
    getMedicineOrderStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    getMedicineOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.medicinesOrder = action.payload;
    },
    getMedicineOrderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //add order
    addOrdersStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    addOrdersSuccess: (state, action) => {
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
  getMedicinesStart,
  getMedicinesSuccess,
  getMedicinesFailure,
  getMedicineStart,
  getMedicineSuccess,
  getMedicineFailure,
  getMedicineOrderStart,
  getMedicineOrderSuccess,
  getMedicineOrderFailure,
  addOrdersStart,
  addOrdersSuccess,
  addOrdersFailure,
} = parcelSlice.actions;
export default parcelSlice.reducer;
