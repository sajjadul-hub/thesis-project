import { createSlice } from "@reduxjs/toolkit";

export const parcelSlice = createSlice({
  name: "blog",
  initialState: {
    isLoading: false,
    blogs: [],
    blog: {},
    error: "",
  },
  reducers: {
    //Get Blogs
    getBlogsStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    getBLogsSuccess: (state, action) => {
      state.isLoading = false;
      state.blogs = action.payload;
    },
    getBlogsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //Get Blog
    getBlogStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    getBLogSuccess: (state, action) => {
      state.isLoading = false;
      state.blog = action.payload;
    },
    getBlogFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // // Delete
    // deleteSliderStart: (state) => {
    //   state.isLoading = true;
    //   state.error = "";
    // },
    // deleteSliderSuccess: (state, action) => {
    //   state.isLoading = false;
    //   const deletedSlider = state.sliders.filter(
    //     (item) => item._id !== action.payload
    //   );
    //   state.sliders = deletedSlider;
    // },
    // deleteSliderFailure: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // // Update Slider
    // updateSliderStart: (state) => {
    //   state.isLoading = true;
    //   state.error = "";
    // },
    // updateSliderSuccess: (state, action) => {
    //   state.isLoading = false;
    //   const updatedSliderIndex = state.sliders.findIndex(
    //     (item) => item._id === action.payload.id
    //   );

    //   if (updatedSliderIndex !== -1) {
    //     const updatedSlider = {
    //       ...action.payload.updatedSlider,
    //       _id: action.payload.id,
    //     };
    //     state.sliders[updatedSliderIndex] = updatedSlider;
    //   }
    // },
    // updatedSliderFailure: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },

    // //   Post new Slider

    addBlogStart: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    addBlogSuccess: (state, action) => {
      state.isLoading = false;
      state.blogs.push(action.payload);
    },
    addBlogFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addBlogStart,
  addBlogSuccess,
  addBlogFailure,
  getBlogsStart,
  getBLogsSuccess,
  getBlogsFailure,
  getBlogStart,
  getBLogSuccess,
  getBlogFailure,
} = parcelSlice.actions;
export default parcelSlice.reducer;
