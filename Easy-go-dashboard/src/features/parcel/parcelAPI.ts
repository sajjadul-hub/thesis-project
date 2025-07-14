import { AxiosError } from "axios";
import { AppDispatch } from "../../app/store";
import {
  getParcelFailure,
  getParcelStart,
  getParcelSuccess,
} from "./parcelSlice";
import { publicRequest } from "../../requestMethod";

export const getParcel = async (dispatch: AppDispatch) => {
  dispatch(getParcelStart());
  try {
    const res = await publicRequest.get("/parcel");
    dispatch(getParcelSuccess(res.data?.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An error happened";
    dispatch(getParcelFailure(errorMessage));
  }
};
