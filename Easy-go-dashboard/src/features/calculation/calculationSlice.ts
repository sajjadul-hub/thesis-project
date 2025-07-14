import { createSlice } from "@reduxjs/toolkit";

const calculationSlice = createSlice({
  name: "calculation",
  initialState: {
    calculation: [],
    parcelCalculation: [],
    isLoading: false,
    error: false,
  },
  reducers: {
    getCalculationStart: (state) => {
      state.isLoading = true;
    },
    getCalculationSuccess: (state, action) => {
      state.isLoading = false;
      state.calculation = action.payload;
      state.error = false;
    },
    getCalculationFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addCalculationStart: (state) => {
      state.isLoading = true;
    },
    addCalculationSuccess: (state, action) => {
      state.isLoading = false;
      state.calculation = action.payload;
      state.error = false;
    },
    addCalculationFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getParcelCalculationStart: (state) => {
      state.isLoading = true;
    },
    getParcelCalculationSuccess: (state, action) => {
      state.isLoading = false;
      state.parcelCalculation = action.payload;
      state.error = false;
    },
    getParcelCalculationFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addParcelCalculationStart: (state) => {
      state.isLoading = true;
    },
    addParcelCalculationSuccess: (state, action) => {
      state.isLoading = false;
      state.parcelCalculation = action.payload;
      state.error = false;
    },
    addParcelCalculationFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const {
  addCalculationStart,
  addCalculationSuccess,
  addCalculationFailure,
  getCalculationStart,
  getCalculationSuccess,
  getCalculationFailure,
  addParcelCalculationStart,
  addParcelCalculationSuccess,
  addParcelCalculationFailure,
  getParcelCalculationStart,
  getParcelCalculationSuccess,
  getParcelCalculationFailure,
} = calculationSlice.actions;
export default calculationSlice.reducer;
