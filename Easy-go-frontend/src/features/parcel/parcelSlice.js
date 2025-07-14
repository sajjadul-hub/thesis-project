import { createSlice } from "@reduxjs/toolkit";

export const parcelSlice = createSlice({
  name: "parcel",
  initialState: {
    isLoading: false,
    percels: [],
    parcel: {},
    error: "",
  },
  reducers: {
    addParcelStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    addParcelSuccess: (state, action) => {
      state.isLoading = false;
      state.percels.push(action.payload);
    },
    addParcelFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getParcelStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    getParcelSuccess: (state, action) => {
      state.isLoading = false;
      state.percels = action.payload;
    },
    getParcelFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addParcelStart,
  addParcelSuccess,
  addParcelFailure,
  getParcelFailure,
  getParcelSuccess,
  getParcelStart,
} = parcelSlice.actions;
export default parcelSlice.reducer;
