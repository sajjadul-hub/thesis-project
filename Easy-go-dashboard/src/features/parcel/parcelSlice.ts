import { createSlice } from "@reduxjs/toolkit";

const parcelSlice = createSlice({
  name: "parcel",
  initialState: {
    parcelList: [],
    parcel: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    getParcelStart: (state) => {
      state.isLoading = true;
    },
    getParcelSuccess: (state, action) => {
      state.isLoading = false;
      state.parcelList = action.payload;
      state.error = false;
    },
    getParcelFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const { getParcelStart, getParcelSuccess, getParcelFailure } =
  parcelSlice.actions;
export default parcelSlice.reducer;
