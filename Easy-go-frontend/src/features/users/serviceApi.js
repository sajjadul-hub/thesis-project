import { publicRequest } from "../../requestMethod";
import {
  getUserFailure,
  getUserStart,
  getUserSuccess,
  registrationFailure,
  registrationStart,
  registrationSuccess,
} from "./userSlice";

export const userRegistration = async (dispatch, payload) => {
  dispatch(registrationStart());
  try {
    const res = await publicRequest.post("/users/register", payload);
    dispatch(registrationSuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "An error occurred.";
    dispatch(registrationFailure(errorMessage));
  }
};
export const getUser = async (dispatch, payload) => {
  dispatch(getUserStart());
  try {
    const res = await publicRequest.get(`/users/${payload}`);
    dispatch(getUserSuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "An error occurred.";
    dispatch(getUserFailure(errorMessage));
  }
};
