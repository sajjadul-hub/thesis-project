import Swal from "sweetalert2";

import { userRequest } from "../../requestMethod";
import {
  addOrdersFailure,
  addOrdersStart,
  addOrdersSuccess,
  getMedicineFailure,
  getMedicineOrderFailure,
  getMedicineOrderStart,
  getMedicineOrderSuccess,
  getMedicineStart,
  getMedicineSuccess,
  getMedicinesFailure,
  getMedicinesStart,
  getMedicinesSuccess,
} from "./medicineSlice";

export const getMedicines = async (dispatch, query) => {
  dispatch(getMedicinesStart());
  try {
    const res = query
      ? await userRequest.get(
          `/medicine?cat=${query?.cat}&page=${query?.page}&limit=${query?.limit}`
        )
      : await userRequest.get(`/medicine`);
    dispatch(getMedicinesSuccess(res.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(getMedicinesFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};

export const getMedicine = async (dispatch, id) => {
  dispatch(getMedicineStart());
  try {
    const res = await userRequest.get(`/medicine/${id}`);
    dispatch(getMedicineSuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(getMedicineFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};

// order medicine
export const addMedicineOrder = async (dispatch, payload) => {
  dispatch(addOrdersStart());
  try {
    const res = await userRequest.post(`/order-medicine/add-order`, payload);
    dispatch(addOrdersSuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(addOrdersFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};
export const getMedicineOrder = async (dispatch, id) => {
  dispatch(getMedicineOrderStart());
  try {
    const res = await userRequest.get(`/order-medicine/user/${id}`, id);
    dispatch(getMedicineOrderSuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(getMedicineOrderFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};
