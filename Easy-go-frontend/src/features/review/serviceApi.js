import { publicRequest } from "../../requestMethod";
import {
  addReviewFailure,
  addReviewStart,
  addReviewSuccess,
  getReviewFailure,
  getReviewStart,
  getReviewSuccess,
} from "./reviewSlice";

export const addReview = async (dispatch, payload) => {
  dispatch(addReviewStart());
  try {
    const res = await publicRequest.post("/review/add-review", payload);
    dispatch(addReviewSuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "An error occurred.";
    dispatch(addReviewFailure(errorMessage));
  }
};
export const getReview = async (dispatch) => {
  dispatch(getReviewStart());
  try {
    const res = await publicRequest.get(
      `/review?isApproved=${true}&limit=${3}`
    );
    dispatch(getReviewSuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "An error occurred.";
    dispatch(getReviewFailure(errorMessage));
  }
};
