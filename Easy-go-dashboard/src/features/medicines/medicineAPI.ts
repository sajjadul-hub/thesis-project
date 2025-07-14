import { AxiosError } from "axios";
import { AppDispatch } from "../../app/store";
import {
  addMedicineFailure,
  addMedicineStart,
  addMedicineSuccess,
  deleteMedicineFailure,
  deleteMedicineStart,
  deleteMedicineSuccess,
  deletePrescriptionFailure,
  deletePrescriptionStart,
  deletePrescriptionSuccess,
  getMedicineFailure,
  getMedicineStart,
  getMedicineSuccess,
  getPrescriptionFailure,
  getPrescriptionStart,
  getPrescriptionSuccess,
  getSingleMedicineFailure,
  getSingleMedicineStart,
  getSingleMedicineSuccess,
  updateMedicineFailure,
  updateMedicineStart,
  updateMedicineSuccess,
} from "./medicineSlice";
import {
  formDataRequest,
  publicRequest,
  userRequest,
} from "../../requestMethod";
import Swal from "sweetalert2";

// get all medicine api
export const getMedicines = async (dispatch: AppDispatch) => {
  dispatch(getMedicineStart());
  try {
    const res = await publicRequest.get(`/medicine`);
    dispatch(getMedicineSuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(getMedicineFailure(errorMessage));
  }
};

// single medicine api

export const getSingleMedicine = async (dispatch: AppDispatch, id: string) => {
  dispatch(getSingleMedicineStart());
  try {
    const res = await publicRequest.get(`/medicine/${id}`);
    dispatch(getSingleMedicineSuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(getSingleMedicineFailure(errorMessage));
  }
};

// update medicine
export const updateMedicine = async (
  dispatch: AppDispatch,
  id: string,
  updatedData: any
) => {
  dispatch(updateMedicineStart());
  try {
    const res = await formDataRequest.patch(`/medicine/${id}`, updatedData);
    dispatch(updateMedicineSuccess(res.data?.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(updateMedicineFailure(errorMessage));
  }
};

// add medicine
export const addMedicine = async (dispatch: AppDispatch, newData: any) => {
  dispatch(addMedicineStart());
  try {
    const res = await formDataRequest.post(`/medicine/add-medicine`, newData);
    dispatch(addMedicineSuccess(res.data?.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(addMedicineFailure(errorMessage));
  }
};

// delete medicine
export const deleteMedicine = async (dispatch: AppDispatch, id: string) => {
  console.log(id);
  dispatch(deleteMedicineStart());
  try {
    await userRequest.delete(`/medicine/${id}`);
    dispatch(deleteMedicineSuccess(id));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error happened";
    dispatch(deleteMedicineFailure(errorMessage));
  }
};

// get all prescription
export const getPrescription = async (dispatch: AppDispatch) => {
  dispatch(getPrescriptionStart());
  try {
    const res = await publicRequest.get(`/prescription`);
    dispatch(getPrescriptionSuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(getPrescriptionFailure(errorMessage));
  }
};

// delete prescription
export const deletePrescription = async (dispatch: AppDispatch, id: string) => {
  dispatch(deletePrescriptionStart());
  try {
    await publicRequest.delete(`/prescription/${id}`);
    dispatch(deletePrescriptionSuccess(id));
    Swal.fire("Deleted!", "Prescription has been deleted.", "success");
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Happened";
    dispatch(deletePrescriptionFailure(errorMessage));
  }
};
