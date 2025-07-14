import { AxiosError } from "axios";
import { AppDispatch } from "../../app/store";
import {
  addBannerFailure,
  addBannerStart,
  addBannerSuccess,
  deleteBannerStart,
  deleteBannerSuccess,
  getBannerFailure,
  getBannerStart,
  getBannerSuccess,
  updateBannerFailure,
  updateBannerStart,
  updateBannerSuccess,
} from "./bannerSlice";
import {
  formDataRequest,
  publicRequest,
  userRequest,
} from "../../requestMethod";
import { deleteBlogFailure } from "../blogs/blogSlice";

export const getAllBanner = async (dispatch: AppDispatch) => {
  dispatch(getBannerStart());
  try {
    const res = await publicRequest.get("/banner");
    dispatch(getBannerSuccess(res.data?.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Occurred..";
    dispatch(getBannerFailure(errorMessage));
  }
};

export const addBanner = async (dispatch: AppDispatch, newData: any) => {
  dispatch(addBannerStart());
  try {
    const res = await formDataRequest.post("/banner/create", newData);
    dispatch(addBannerSuccess(res.data?.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Occurred..";
    dispatch(addBannerFailure(errorMessage));
  }
};

// delete banner
export const deleteBanner = async (dispatch: AppDispatch, id: string) => {
  dispatch(deleteBannerStart());
  try {
    await userRequest.delete(`/banner/${id}`);
    dispatch(deleteBannerSuccess(id));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error occurred";
    dispatch(deleteBlogFailure(errorMessage));
  }
};
// delete banner
export const updateBanner = async (
  dispatch: AppDispatch,
  id: string,
  updateData: FormData
) => {
  dispatch(updateBannerStart());
  try {
    const res = await formDataRequest.patch(`/banner/${id}`, updateData);
    dispatch(updateBannerSuccess(res.data?.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error occurred";
    dispatch(updateBannerFailure(errorMessage));
  }
};
