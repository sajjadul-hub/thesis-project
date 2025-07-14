import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    registrationStart: (state) => {
      state.isLoading = true;
    },
    registrationSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    registrationFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUserStart: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    getUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  registrationFailure,
  registrationStart,
  registrationSuccess,
  getUserStart,
  getUserSuccess,
  getUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
