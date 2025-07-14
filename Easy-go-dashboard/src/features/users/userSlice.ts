import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    isLoading: false,
    error: false,
  },
  reducers: {
    getUserStart: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.isLoading = false;
      state.userList = action.payload;
      state.error = false;
    },
    getUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { getUserStart, getUserSuccess, getUserFailure } =
  userSlice.actions;
export default userSlice.reducer;
