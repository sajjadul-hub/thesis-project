import { createSlice } from "@reduxjs/toolkit";

interface Category {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface CategoryState {
  isLoading: boolean;
  categoryList: Category[];
  category: Category | null;
  error: boolean;
}

const initialState: CategoryState = {
  isLoading: false,
  categoryList: [],
  category: null,
  error: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategoriesStart: (state) => {
      state.isLoading = true;
    },
    getCategoriesSuccess: (state, action) => {
      state.isLoading = false;
      state.categoryList = action.payload;
      state.error = false;
    },
    getCategoriesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // new add category
    addCategoryStart: (state) => {
      state.isLoading = true;
    },
    addCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.categoryList = [...state.categoryList, action.payload];
      state.error = false;
    },
    addCategoryFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // delete category
    deleteCategoryStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    deleteCategorySuccess: (state, action) => {
      state.isLoading = false;
      const deleteCategory = state.categoryList.filter(
        (item: any) => item._id !== action.payload
      );
      state.categoryList = deleteCategory;
      state.error = false;
    },
    deleteCategoryFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // update category
    updateCategoryStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    updateCategorySuccess: (state, action) => {
      state.isLoading = false;
      const filteredCategory = state.categoryList.filter(
        (item) => item._id !== action.payload._id
      );
      state.categoryList = [...filteredCategory, action.payload];
      state.category = action.payload;
      state.error = false;
    },
    updateCategoryFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = categorySlice.actions;
export default categorySlice.reducer;
