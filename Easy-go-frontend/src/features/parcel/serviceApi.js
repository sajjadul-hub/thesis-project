import Swal from "sweetalert2";

import { userRequest } from "../../requestMethod";
import {
  addParcelFailure,
  addParcelStart,
  addParcelSuccess,
  getParcelFailure,
  getParcelStart,
  getParcelSuccess,
} from "./parcelSlice";

export const addParcel = async (dispatch, data) => {
  dispatch(addParcelStart());
  try {
    const res = await userRequest.post(`/parcel/book-parcel`, data);
    dispatch(addParcelSuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(addParcelFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};

export const getParcelOrder = async (dispatch, id) => {
  dispatch(getParcelStart());
  try {
    const res = await userRequest.get(`/parcel/user/${id}`, id);
    dispatch(getParcelSuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(getParcelFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};
