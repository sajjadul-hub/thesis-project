import { AxiosError } from "axios";
import { AppDispatch } from "../../app/store";
import { publicRequest } from "../../requestMethod";
import {
  deleteMedicineOrderFailure,
  deleteMedicineOrderStart,
  deleteMedicineOrderSuccess,
  getMedicineOrdersFailure,
  getMedicineOrdersStart,
  getMedicineOrdersSuccess,
  getParcelBookedFailure,
  getParcelBookedStart,
  getParcelBookedSuccess,
  getProductOrdersFailure,
  getProductOrdersStart,
  getProductOrdersSuccess,
  getRentBookedFailure,
  getRentBookedStart,
  getRentBookedSuccess,
  getSingleMedicineOrderFailure,
  getSingleMedicineOrderStart,
  getSingleMedicineOrderSuccess,
  getSingleProductOrderFailure,
  getSingleProductOrderStart,
  getSingleProductOrderSuccess,
  getSingleRentBookedFailure,
  getSingleRentBookedStart,
  getSingleRentBookedSuccess,
  updateMedicineOrderFailure,
  updateMedicineOrderStart,
  updateMedicineOrderSuccess,
  updateParcelBookedFailure,
  updateParcelBookedStart,
  updateParcelBookedSuccess,
  updateProductOrdersFailure,
  updateProductOrdersStart,
  updateProductOrdersSuccess,
  updateRentBookedFailure,
  updateRentBookedStart,
  updateRentBookedSuccess,
} from "./orderSlice";

// bike api
export const getBikeBookingList = async (dispatch: AppDispatch) => {
  dispatch(getRentBookedStart());
  try {
    const res = await publicRequest.get(`/bike-rent`);
    dispatch(getRentBookedSuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error occurred.";
    dispatch(getRentBookedFailure(errorMessage));
  }
};
export const updateBikeBooking = async (
  dispatch: AppDispatch,
  id: string,
  updatedData: any
) => {
  dispatch(updateRentBookedStart());
  try {
    const res = await publicRequest.patch(`/bike-rent/${id}`, updatedData);
    dispatch(updateRentBookedSuccess(res.data?.data));
    getBikeBookingList(dispatch);
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(updateRentBookedFailure(errorMessage));
  }
};
export const getBikeBooking = async (dispatch: AppDispatch, id: string) => {
  dispatch(getSingleRentBookedStart());
  try {
    const res = await publicRequest.get(`/bike-rent/${id}`);
    dispatch(getSingleRentBookedSuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error occurred.";
    dispatch(getSingleRentBookedFailure(errorMessage));
  }
};

// parcel api
export const getParcelBookingList = async (dispatch: AppDispatch) => {
  dispatch(getParcelBookedStart());
  try {
    const res = await publicRequest.get(`/parcel`);
    dispatch(getParcelBookedSuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error occurred.";
    dispatch(getParcelBookedFailure(errorMessage));
  }
};
export const updateParcelBooking = async (
  dispatch: AppDispatch,
  id: string,
  updatedData: any
) => {
  dispatch(updateParcelBookedStart());
  try {
    const res = await publicRequest.patch(`/parcel/${id}`, updatedData);
    dispatch(updateParcelBookedSuccess(res.data?.data));
    getParcelBookingList(dispatch);
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(updateParcelBookedFailure(errorMessage));
  }
};

// medicine api
export const getMedicineOrderList = async (dispatch: AppDispatch) => {
  dispatch(getMedicineOrdersStart());
  try {
    const res = await publicRequest.get(`/order-medicine`);
    dispatch(getMedicineOrdersSuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error occurred.";
    dispatch(getMedicineOrdersFailure(errorMessage));
  }
};

export const getMedicineOrder = async (dispatch: AppDispatch, id: string) => {
  dispatch(getSingleMedicineOrderStart());
  try {
    const res = await publicRequest.get(`/order-medicine/${id}`);
    dispatch(getSingleMedicineOrderSuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error occurred.";
    dispatch(getSingleMedicineOrderFailure(errorMessage));
  }
};
export const updateMedicineOrder = async (
  dispatch: AppDispatch,
  id: string,
  updatedData: any
) => {
  dispatch(updateMedicineOrderStart());
  try {
    const res = await publicRequest.patch(`/order-medicine/${id}`, updatedData);
    dispatch(updateMedicineOrderSuccess(res.data?.data));
    getMedicineOrderList(dispatch);
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(updateMedicineOrderFailure(errorMessage));
  }
};
export const deleteMedicineOrder = async (
  dispatch: AppDispatch,
  id: string
) => {
  dispatch(deleteMedicineOrderStart());
  try {
    console.log(id);

    const res = await publicRequest.delete(`/order-medicine/${id}`);
    dispatch(deleteMedicineOrderSuccess(res.data?.data));
    console.log(res.data?.data);
    getMedicineOrderList(dispatch);
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(deleteMedicineOrderFailure(errorMessage));
  }
};

// mediator product api
export const getProductOrderList = async (dispatch: AppDispatch) => {
  dispatch(getProductOrdersStart());
  try {
    const res = await publicRequest.get(`/order-product`);
    dispatch(getProductOrdersSuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error occurred.";
    dispatch(getProductOrdersFailure(errorMessage));
  }
};
export const updateProductOrder = async (
  dispatch: AppDispatch,
  id: string,
  updatedData: any
) => {
  dispatch(updateProductOrdersStart());
  try {
    const res = await publicRequest.patch(`/order-product/${id}`, updatedData);
    dispatch(updateProductOrdersSuccess(res.data?.data));
    getProductOrderList(dispatch);
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(updateProductOrdersFailure(errorMessage));
  }
};
export const getProductOrder = async (dispatch: AppDispatch, id: string) => {
  dispatch(getSingleProductOrderStart());
  try {
    const res = await publicRequest.get(`/order-product/${id}`);
    dispatch(getSingleProductOrderSuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error occurred.";
    dispatch(getSingleProductOrderFailure(errorMessage));
  }
};
