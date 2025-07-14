import { AxiosError } from "axios";
import { AppDispatch } from "../../app/store";
import {
  getCategoriesStart,
  getCategoriesSuccess,
  getCategoriesFailure,
  addCategoryStart,
  addCategorySuccess,
  addCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
} from "./categorySlice";
import {
  formDataRequest,
  publicRequest,
  userRequest,
} from "../../requestMethod";

export const getCategories = async (dispatch: AppDispatch) => {
  dispatch(getCategoriesStart());
  try {
    const res = await publicRequest.get("/category");
    dispatch(getCategoriesSuccess(res.data?.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Occurred..";
    dispatch(getCategoriesFailure(errorMessage));
  }
};

export const addCategory = async (dispatch: AppDispatch, newData: any) => {
  dispatch(addCategoryStart());
  try {
    const res = await formDataRequest.post("/category/add-category", newData);
    dispatch(addCategorySuccess(res.data?.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error Occurred..";
    dispatch(addCategoryFailure(errorMessage));
  }
};

// delete category
export const deleteCategory = async (dispatch: AppDispatch, id: string) => {
  dispatch(deleteCategoryStart());
  try {
    await userRequest.delete(`/category/${id}`);
    dispatch(deleteCategorySuccess(id));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error occurred";
    dispatch(deleteCategoryFailure(errorMessage));
  }
};
// delete category
export const updateCategory = async (
  dispatch: AppDispatch,
  id: string,
  updateData: any
) => {
  dispatch(updateCategoryStart());
  try {
    const res = await formDataRequest.patch(`/category/${id}`, updateData);
    dispatch(updateCategorySuccess(res.data.data));
  } catch (error: AxiosError | any) {
    const errorMessage = error.response?.data?.error || "An Error occurred";
    dispatch(updateCategoryFailure(errorMessage));
  }
};
