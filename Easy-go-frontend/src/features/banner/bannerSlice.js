import { createSlice } from "@reduxjs/toolkit";

export const BannerSlide = createSlice({
  name: "slider",
  initialState: {
    isLoading: false,
    sliders: [],
    slider: {},
    error: "",
  },
  reducers: {
    //Get All Slider
    getSliderStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    getSliderSuccess: (state, action) => {
      state.isLoading = false;
      state.sliders = action.payload;
    },
    getSliderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Delete
    deleteSliderStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    deleteSliderSuccess: (state, action) => {
      state.isLoading = false;
      const deletedSlider = state.sliders.filter(
        (item) => item._id !== action.payload
      );
      state.sliders = deletedSlider;
    },
    deleteSliderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Update Slider
    updateSliderStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    updateSliderSuccess: (state, action) => {
      state.isLoading = false;
      const updatedSliderIndex = state.sliders.findIndex(
        (item) => item._id === action.payload.id
      );

      if (updatedSliderIndex !== -1) {
        const updatedSlider = {
          ...action.payload.updatedSlider,
          _id: action.payload.id,
        };
        state.sliders[updatedSliderIndex] = updatedSlider;
      }
    },
    updatedSliderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //   Post new Slider

    addSliderStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    addSliderSuccess: (state, action) => {
      state.isLoading = false;
      state.sliders.push(action.payload);
    },
    addSliderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getSliderStart,
  getSliderSuccess,
  getSliderFailure,
  updateSliderStart,
  updateSliderSuccess,
  updatedSliderFailure,
  addSliderStart,
  addSliderSuccess,
  addSliderFailure,
  deleteSliderStart,
  deleteSliderSuccess,
  deleteSliderFailure,
} = BannerSlide.actions;
export default BannerSlide.reducer;
