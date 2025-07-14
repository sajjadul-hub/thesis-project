import Swal from "sweetalert2";

import { userRequest } from "../../requestMethod";
import {
  getBLogSuccess,
  getBLogsSuccess,
  getBlogFailure,
  getBlogStart,
  getBlogsFailure,
  getBlogsStart,
} from "./blogSlice";

export const getBlogs = async (dispatch, query) => {
  dispatch(getBlogsStart());
  try {
    const res = query
      ? await userRequest.get(
          `/blog?cat=${query?.cat}&page=${query?.page}&limit=${query?.limit}`
        )
      : await userRequest.get(`/blog`);
    dispatch(getBLogsSuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(getBlogsFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};

export const getBlog = async (dispatch, id) => {
  dispatch(getBlogStart());
  try {
    const res = await userRequest.get(`/blog/${id}`);
    dispatch(getBLogSuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(getBlogFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};
