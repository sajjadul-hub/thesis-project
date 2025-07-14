import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    bannerList: [],
    banner: {},
    isLoading: false,
    error: false,
  },
  reducers: {
    getBannerStart: (state) => {
      state.isLoading = true;
    },
    getBannerSuccess: (state, action) => {
      state.isLoading = false;
      state.bannerList = action.payload;
      state.error = false;
    },
    getBannerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // new add banner
    addBannerStart: (state) => {
      state.isLoading = true;
    },
    addBannerSuccess: (state, action) => {
      state.isLoading = false;
      state.bannerList = action.payload;
      state.error = false;
    },
    addBannerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // delete banner
    deleteBannerStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    deleteBannerSuccess: (state, action) => {
      state.isLoading = false;
      const deleteBanner = state.bannerList.filter(
        (item: any) => item._id !== action.payload
      );
      state.bannerList = deleteBanner;
      state.error = false;
    },
    deleteBannerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // update banner
    updateBannerStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    updateBannerSuccess: (state, action) => {
      state.isLoading = false;
      state.banner = action.payload;
      state.error = false;
    },
    updateBannerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getBannerStart,
  getBannerSuccess,
  getBannerFailure,
  addBannerStart,
  addBannerSuccess,
  addBannerFailure,
  deleteBannerStart,
  deleteBannerSuccess,
  deleteBannerFailure,
  updateBannerStart,
  updateBannerSuccess,
  updateBannerFailure,
} = bannerSlice.actions;
export default bannerSlice.reducer;
