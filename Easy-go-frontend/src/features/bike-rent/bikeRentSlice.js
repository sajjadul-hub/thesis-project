import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
  name: "bike-rent",
  initialState: {
    isLoading: false,
    bookings: [],
    booking: {},
    error: "",
  },
  reducers: {
    addBookingStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    addBookingSuccess: (state, action) => {
      state.isLoading = false;
      state.bookings.push(action.payload);
    },
    addBookingFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getBookingStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    getBookingSuccess: (state, action) => {
      state.isLoading = false;
      state.bookings = action.payload;
    },
    getBookingFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addBookingStart,
  addBookingSuccess,
  addBookingFailure,
  getBookingStart,
  getBookingSuccess,
  getBookingFailure,
} = bookingSlice.actions;
export default bookingSlice.reducer;
