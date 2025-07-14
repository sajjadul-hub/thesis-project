import { AxiosError } from "axios";
import { AppDispatch } from "../../app/store";
import { publicRequest } from "../../requestMethod";
import { getUserFailure, getUserStart, getUserSuccess } from "./userSlice";

export const getUser = async (dispatch: AppDispatch) => {
  dispatch(getUserStart());
  try {
    const res = await publicRequest.get(`/users`);
    dispatch(getUserSuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error occurred.";
    dispatch(getUserFailure(errorMessage));
  }
};
