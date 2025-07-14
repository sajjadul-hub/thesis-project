import { AxiosError } from "axios";
import { AppDispatch } from "../../app/store";
import {
  getMediatorStart,
  getMediatorSuccess,
  getMediatorFailure,
  getSingleMediatorStart,
  getSingleMediatorSuccess,
  getSingleMediatorFailure,
  updateMediatorStart,
  updateMediatorSuccess,
  updateMediatorFailure,
  addMediatorStart,
  addMediatorSuccess,
  addMediatorFailure,
  deleteMediatorStart,
  deleteMediatorSuccess,
  deleteMediatorFailure,
} from "./mediatorSlice";
import {
  formDataRequest,
  publicRequest,
  userRequest,
} from "../../requestMethod";

// get all mediator api
export const getMediators = async (dispatch: AppDispatch) => {
  dispatch(getMediatorStart());
  try {
    const res = await publicRequest.get(`/product`);
    console.log(res.data.data);

    dispatch(getMediatorSuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(getMediatorFailure(errorMessage));
  }
};

// single mediator api

export const getSingleMediator = async (dispatch: AppDispatch, id: string) => {
  dispatch(getSingleMediatorStart());
  try {
    const res = await publicRequest.get(`/product/${id}`);
    dispatch(getSingleMediatorSuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(getSingleMediatorFailure(errorMessage));
  }
};

// update mediator
export const updateMediator = async (
  dispatch: AppDispatch,
  id: string,
  updatedData: any
) => {
  dispatch(updateMediatorStart());
  try {
    const res = await formDataRequest.patch(`/product/${id}`, updatedData);
    dispatch(updateMediatorSuccess(res.data?.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(updateMediatorFailure(errorMessage));
  }
};

// add mediator
export const addMediator = async (dispatch: AppDispatch, newData: any) => {
  dispatch(addMediatorStart());
  try {
    const res = await formDataRequest.post(`/product/add-product`, newData);
    dispatch(addMediatorSuccess(res.data?.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(addMediatorFailure(errorMessage));
  }
};

// delete mediator
export const deleteMediator = async (dispatch: AppDispatch, id: string) => {
  console.log(id);
  dispatch(deleteMediatorStart());
  try {
    await userRequest.delete(`/product/${id}`);
    dispatch(deleteMediatorSuccess(id));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error happened";
    dispatch(deleteMediatorFailure(errorMessage));
  }
};
