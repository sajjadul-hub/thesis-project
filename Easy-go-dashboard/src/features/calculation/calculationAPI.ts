import { AxiosError } from "axios";
import { AppDispatch } from "../../app/store";
import {
  addCalculationStart,
  addCalculationSuccess,
  addCalculationFailure,
  getCalculationStart,
  getCalculationSuccess,
  getCalculationFailure,
  addParcelCalculationStart,
  addParcelCalculationSuccess,
  addParcelCalculationFailure,
  getParcelCalculationStart,
  getParcelCalculationSuccess,
  getParcelCalculationFailure,
} from "./calculationSlice";
import { publicRequest } from "../../requestMethod";

export const getCalculation = async (dispatch: AppDispatch) => {
  dispatch(getCalculationStart());
  try {
    const res = await publicRequest.get("/calculation");
    dispatch(getCalculationSuccess(res.data?.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error happened";
    dispatch(getCalculationFailure(errorMessage));
  }
};

export const addCalculation = async (dispatch: AppDispatch, newData: any) => {
  dispatch(addCalculationStart());
  try {
    const res = await publicRequest.post(
      `/calculation/add-calculation`,
      newData
    );
    dispatch(addCalculationSuccess(res.data?.data));
    const res2 = await publicRequest.get("/calculation");
    dispatch(getCalculationSuccess(res2.data?.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(addCalculationFailure(errorMessage));
  }
};

export const addParcelCalculation = async (
  dispatch: AppDispatch,
  newData: any
) => {
  dispatch(addParcelCalculationStart());
  try {
    const res = await publicRequest.post(
      `/calculation/add-parcel-calculation`,
      newData
    );
    dispatch(addParcelCalculationSuccess(res.data?.data));
    const res2 = await publicRequest.get("/calculation/parcel");
    dispatch(getCalculationSuccess(res2.data?.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(addParcelCalculationFailure(errorMessage));
  }
};

export const getParcelCalculation = async (dispatch: AppDispatch) => {
  dispatch(getParcelCalculationStart());
  try {
    const res = await publicRequest.get("/calculation/parcel");
    dispatch(getParcelCalculationSuccess(res.data?.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error happened";
    dispatch(getParcelCalculationFailure(errorMessage));
  }
};
