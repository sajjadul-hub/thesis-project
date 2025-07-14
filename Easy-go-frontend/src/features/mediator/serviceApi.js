import Swal from "sweetalert2";

import { userRequest } from "../../requestMethod";
import {
  getMediatorsStart,
  getMediatorsSuccess,
  getMediatorsFailure,
  getMediatorStart,
  getMediatorSuccess,
  getMediatorFailure,
  getMediatorCategoryStart,
  getMediatorCategorySuccess,
  getMediatorCategoryFailure,
  addOrdersStart,
  addOrderSuccess,
  addOrdersFailure,
  getMediatorsOrderStart,
  getMediatorsOrderSuccess,
  getMediatorsOrderFailure,
} from "./mediatorSlice";

export const getMediators = async (dispatch, query) => {
  dispatch(getMediatorsStart());
  try {
    const res = query
      ? await userRequest.get(
          `/product?categoryFlag=${query?.categoryFlag}&page=${query?.page}&limit=${query?.limit}`
        )
      : await userRequest.get(`/product`);

    dispatch(getMediatorsSuccess(res.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(getMediatorsFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};

export const getMediator = async (dispatch, id) => {
  dispatch(getMediatorStart());
  try {
    const res = await userRequest.get(`/product/${id}`);
    dispatch(getMediatorSuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(getMediatorFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};

export const getMediatorCategory = async (dispatch) => {
  dispatch(getMediatorCategoryStart());
  try {
    const res = await userRequest.get(`/category`);
    dispatch(getMediatorCategorySuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(getMediatorCategoryFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};

// order api
export const addProductOrder = async (dispatch, payload) => {
  dispatch(addOrdersStart());
  try {
    const res = await userRequest.post(`/order-product/add-order`, payload);
    dispatch(addOrderSuccess(res.data.data));
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

export const getMediatorsOrder = async (dispatch, id) => {
  dispatch(getMediatorsOrderStart());
  try {
    const res = await userRequest.get(`/order-product/user/${id}`, id);
    dispatch(getMediatorsOrderSuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(getMediatorsOrderFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};
