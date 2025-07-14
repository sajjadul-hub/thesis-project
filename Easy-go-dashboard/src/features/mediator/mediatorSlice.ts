import { createSlice } from "@reduxjs/toolkit";

interface Mediator {
  _id: string;
  image: string;
  name: string;
  description: string;
  basePrice: number;
  discountPrice: number;
  info: string;
  category: {
    _id: string;
    name: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  discount: number;
  categoryFlag: string;
  __v: number;
}

interface CategoryState {
  isLoading: boolean;
  mediatorsList: Mediator[];
  mediator: Mediator | null;
  error: boolean;
}

const initialState: CategoryState = {
  isLoading: false,
  mediatorsList: [],
  mediator: null,
  error: false,
};

const mediatorSlice = createSlice({
  name: "mediator",
  initialState,
  reducers: {
    // get all mediator
    getMediatorStart: (state) => {
      state.isLoading = true;
    },
    getMediatorSuccess: (state, action) => {
      state.isLoading = false;
      state.mediatorsList = action.payload;
      state.error = false;
    },
    getMediatorFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // get Single mediator
    getSingleMediatorStart: (state) => {
      state.isLoading = true;
    },
    getSingleMediatorSuccess: (state, action) => {
      state.isLoading = false;
      state.mediatorsList = action.payload;
      state.error = false;
    },
    getSingleMediatorFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // update mediator
    updateMediatorStart: (state) => {
      state.isLoading = true;
    },
    updateMediatorSuccess: (state, action) => {
      state.isLoading = false;
      const filteredProduct = state.mediatorsList.filter(
        (item) => item._id !== action.payload._id
      );
      state.mediatorsList = [...filteredProduct, action.payload];
      state.mediator = action.payload;
      state.error = false;
    },
    updateMediatorFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // add new mediator
    addMediatorStart: (state) => {
      state.isLoading = true;
    },
    addMediatorSuccess: (state, action) => {
      state.isLoading = false;
      state.mediatorsList = [...state.mediatorsList, action.payload];
      state.error = false;
    },
    addMediatorFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // delete mediator
    deleteMediatorStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    deleteMediatorSuccess: (state, action) => {
      state.isLoading = false;
      const remainProduct = state.mediatorsList.filter(
        (item: any) => item._id !== action.payload
      );
      state.mediatorsList = remainProduct;
      state.error = false;
    },

    deleteMediatorFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // get all mediator
  },
});

export const {
  getMediatorStart,
  getMediatorSuccess,
  getMediatorFailure,
  getSingleMediatorStart,
  getSingleMediatorSuccess,
  getSingleMediatorFailure,
  updateMediatorStart,
  updateMediatorSuccess,
  updateMediatorFailure,
  addMediatorStart,
  addMediatorSuccess,
  addMediatorFailure,
  deleteMediatorStart,
  deleteMediatorSuccess,
  deleteMediatorFailure,
} = mediatorSlice.actions;

export default mediatorSlice.reducer;
