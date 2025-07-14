import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    isLoading: false,
    error: false,
  },
  reducers: {
    addReviewStart: (state) => {
      state.isLoading = true;
    },
    addReviewSuccess: (state, action) => {
      state.isLoading = false;
      state.reviews = action.payload;
      state.error = false;
    },
    addReviewFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getReviewStart: (state) => {
      state.isLoading = true;
    },
    getReviewSuccess: (state, action) => {
      state.isLoading = false;
      state.reviews = action.payload;
      state.error = false;
    },
    getReviewFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addReviewStart,
  addReviewSuccess,
  addReviewFailure,
  getReviewStart,
  getReviewSuccess,
  getReviewFailure,
} = reviewSlice.actions;
export default reviewSlice.reducer;
