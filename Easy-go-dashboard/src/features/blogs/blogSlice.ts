import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogList: [],
    blog: {},
    isLoading: false,
    error: false,
  },
  reducers: {
    // Create blog
    addBlogStart: (state) => {
      state.isLoading = true;
    },
    addBlogSuccess: (state, action) => {
      state.isLoading = false;
      state.blogList = action.payload;
      state.error = false;
    },
    addBlogFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Get blog
    getBlogsStart: (state) => {
      state.isLoading = true;
    },
    getBlogsSuccess: (state, action) => {
      state.isLoading = false;
      state.blogList = action.payload;
      state.error = false;
    },
    getBlogsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Delete blog
    deleteBlogStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    deleteBlogSuccess: (state, action) => {
      state.isLoading = false;
      const restBlog = state.blogList.filter(
        (item: any) => item._id !== action.payload
      );
      state.blogList = restBlog;
      state.error = false;
    },
    deleteBlogFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateBlogStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    updateBlogSuccess: (state, action) => {
      state.isLoading = false;
      state.blog = action.payload;
      state.error = false;
    },
    updateBlogFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getBlogsStart,
  getBlogsSuccess,
  getBlogsFailure,
  addBlogFailure,
  addBlogStart,
  addBlogSuccess,
  deleteBlogStart,
  deleteBlogSuccess,
  deleteBlogFailure,
  updateBlogStart,
  updateBlogSuccess,
  updateBlogFailure,
} = blogSlice.actions;
export default blogSlice.reducer;
