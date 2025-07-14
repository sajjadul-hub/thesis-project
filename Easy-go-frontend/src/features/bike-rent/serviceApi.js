import Swal from "sweetalert2";

import { userRequest } from "../../requestMethod";
import {
  addBookingFailure,
  addBookingStart,
  addBookingSuccess,
  getBookingFailure,
  getBookingStart,
  getBookingSuccess,
} from "./bikeRentSlice";

export const addBooking = async (dispatch, data) => {
  dispatch(addBookingStart());
  try {
    const res = await userRequest.post(`/bike-rent/book-rent`, data);
    dispatch(addBookingSuccess(res.data.data));
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Your rent booked Successfully",
    });
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(addBookingFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};
export const getBooking = async (dispatch, id) => {
  dispatch(getBookingStart());
  try {
    const res = await userRequest.get(`/bike-rent/user/${id}`, id);
    dispatch(getBookingSuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(getBookingFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};
