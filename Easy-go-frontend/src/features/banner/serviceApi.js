import Swal from "sweetalert2";
import {
  addSliderStart,
  addSliderSuccess,
  addSliderFailure,
  deleteSliderFailure,
  deleteSliderStart,
  deleteSliderSuccess,
  getSliderFailure,
  getSliderStart,
  getSliderSuccess,
  updateSliderStart,
  updateSliderSuccess,
  updatedSliderFailure,
} from "./BannerSlice";
import { publicRequest, userRequest } from "../../requestMethod";

// Get all Slider
export const getSliders = async (dispatch) => {
  dispatch(getSliderStart());
  try {
    const res = await publicRequest.get("/sliders");
    dispatch(getSliderSuccess(res.data.data));
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(getSliderFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};

//Delete Slider

export const deleteSlider = async (id, dispatch) => {
  dispatch(deleteSliderStart());
  try {
    await userRequest.delete(`/sliders/${id}`);
    dispatch(deleteSliderSuccess(id));
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Slider Deleted Successfully!",
    });
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(deleteSliderFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};

// Update Slider

export const updateSlider = async (id, slider, dispatch) => {
  try {
    dispatch(updateSliderStart());
    await userRequest.put(`/sliders/${id}`, slider);
    dispatch(updateSliderSuccess({ id, slider }));
    Swal.fire({
      icon: "success",
      title: "Updated",
      text: "Updated Slider Successfully!",
    });
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(updatedSliderFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};

// Post Slider

export const addSlider = async (slider, dispatch) => {
  dispatch(addSliderStart());
  try {
    const res = await userRequest.post(`/sliders`, slider);
    dispatch(addSliderSuccess(res.data.data));
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Added Slider Successfully",
    });
  } catch (err) {
    const errorMessage = err.response?.data?.error || "Error Occurred.";
    dispatch(addSliderFailure(errorMessage));
    Swal.fire({
      icon: "error",
      title: "Uh...",
      text: errorMessage,
    });
  }
};
