import { AxiosError } from "axios";
import { AppDispatch } from "../../app/store";
import { formDataRequest, publicRequest } from "../../requestMethod";
import {
  addBlogFailure,
  addBlogStart,
  addBlogSuccess,
  deleteBlogFailure,
  deleteBlogStart,
  deleteBlogSuccess,
  getBlogsFailure,
  getBlogsStart,
  getBlogsSuccess,
  updateBlogFailure,
  updateBlogStart,
  updateBlogSuccess,
} from "./blogSlice";

export const addBlog = async (dispatch: AppDispatch, payload: any) => {
  dispatch(addBlogStart());
  console.log(payload);
  
  try {
    const res = await formDataRequest.post(`/blog/create-blog`, payload);
    dispatch(addBlogSuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error occurred.";
    dispatch(addBlogFailure(errorMessage));
  }
};
export const getBlogs = async (dispatch: AppDispatch) => {
  dispatch(getBlogsStart());
  try {
    const res = await publicRequest.get(`/blog`);
    dispatch(getBlogsSuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error occurred.";
    dispatch(getBlogsFailure(errorMessage));
  }
};

export const deleteBlog = async (dispatch: AppDispatch, id: string) => {
  dispatch(deleteBlogStart());
  try {
    await publicRequest.delete(`/blog/${id}`);
    dispatch(deleteBlogSuccess(id));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error occurred.";
    dispatch(deleteBlogFailure(errorMessage));
  }
};
//update blog
export const updateBlog = async (
  dispatch: AppDispatch,
  id: string,
  updatedData: FormData
) => {
  dispatch(updateBlogStart());
  try {
    const res = await formDataRequest.patch(`/blog/${id}`, updatedData);
    dispatch(updateBlogSuccess(res.data?.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error occurred.";
    dispatch(updateBlogFailure(errorMessage));
  }
};
