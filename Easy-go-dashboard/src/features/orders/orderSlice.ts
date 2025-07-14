import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    bookingList: [],
    booking: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    // bike rent section
    getRentBookedStart: (state) => {
      state.isLoading = true;
    },
    getRentBookedSuccess: (state, action) => {
      state.isLoading = false;
      state.bookingList = action.payload;
      state.error = false;
    },
    getRentBookedFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateRentBookedStart: (state) => {
      state.isLoading = true;
    },
    updateRentBookedSuccess: (state, action) => {
      state.isLoading = false;
      state.bookingList = [...state.bookingList, action.payload];
      state.booking = action.payload;
      state.error = false;
    },
    updateRentBookedFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getSingleRentBookedStart: (state) => {
      state.isLoading = true;
    },
    getSingleRentBookedSuccess: (state, action) => {
      state.isLoading = false;
      state.booking = action.payload;
      state.error = false;
    },
    getSingleRentBookedFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // parcel delivery section
    getParcelBookedStart: (state) => {
      state.isLoading = true;
    },
    getParcelBookedSuccess: (state, action) => {
      state.isLoading = false;
      state.bookingList = action.payload;
      state.error = false;
    },
    getParcelBookedFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateParcelBookedStart: (state) => {
      state.isLoading = true;
    },
    updateParcelBookedSuccess: (state, action) => {
      state.isLoading = false;
      state.bookingList = [...state.bookingList, action.payload];
      state.error = false;
    },
    updateParcelBookedFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getSingleParcelBookedStart: (state) => {
      state.isLoading = true;
    },
    getSingleParcelBookedSuccess: (state, action) => {
      state.isLoading = false;
      state.booking = action.payload;
      state.error = false;
    },
    getSingleParcelBookedFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // medicine order
    getMedicineOrdersStart: (state) => {
      state.isLoading = true;
    },
    getMedicineOrdersSuccess: (state, action) => {
      state.isLoading = false;
      state.bookingList = action.payload;
      state.error = false;
    },
    getMedicineOrdersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateMedicineOrderStart: (state) => {
      state.isLoading = true;
    },
    updateMedicineOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.bookingList = [...state.bookingList, action.payload];
      state.error = false;
    },
    updateMedicineOrderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteMedicineOrderStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    deleteMedicineOrderSuccess: (state, action) => {
      state.isLoading = false;
      const deleteMedicine = state.bookingList.filter(
        (item: any) => item._id !== action.payload
      );
      state.bookingList = deleteMedicine;
      state.error = false;
    },

    deleteMedicineOrderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getSingleMedicineOrderStart: (state) => {
      state.isLoading = true;
    },
    getSingleMedicineOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.booking = action.payload;
      state.error = false;
    },
    getSingleMedicineOrderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // mediator product order
    getProductOrdersStart: (state) => {
      state.isLoading = true;
    },
    getProductOrdersSuccess: (state, action) => {
      state.isLoading = false;
      state.bookingList = action.payload;
      state.error = false;
    },
    getProductOrdersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateProductOrdersStart: (state) => {
      state.isLoading = true;
    },
    updateProductOrdersSuccess: (state, action) => {
      state.isLoading = false;
      state.bookingList = [...state.bookingList, action.payload];
      state.error = false;
    },
    updateProductOrdersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getSingleProductOrderStart: (state) => {
      state.isLoading = true;
    },
    getSingleProductOrderSuccess: (state, action) => {
      state.isLoading = false;
      state.booking = action.payload;
      state.error = false;
    },
    getSingleProductOrderFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getRentBookedStart,
  getRentBookedSuccess,
  getRentBookedFailure,
  updateParcelBookedStart,
  updateParcelBookedSuccess,
  updateParcelBookedFailure,
  updateRentBookedFailure,
  updateRentBookedStart,
  updateRentBookedSuccess,
  updateProductOrdersFailure,
  updateProductOrdersSuccess,
  updateProductOrdersStart,
  updateMedicineOrderFailure,
  updateMedicineOrderStart,
  updateMedicineOrderSuccess,
  getParcelBookedStart,
  getParcelBookedSuccess,
  getParcelBookedFailure,
  getSingleParcelBookedFailure,
  getSingleParcelBookedStart,
  getSingleParcelBookedSuccess,
  getSingleRentBookedFailure,
  getSingleRentBookedStart,
  getSingleRentBookedSuccess,
  getMedicineOrdersStart,
  getMedicineOrdersSuccess,
  getMedicineOrdersFailure,
  getSingleMedicineOrderStart,
  getSingleMedicineOrderSuccess,
  getSingleMedicineOrderFailure,
  getProductOrdersStart,
  getProductOrdersSuccess,
  getProductOrdersFailure,
  getSingleProductOrderStart,
  getSingleProductOrderSuccess,
  getSingleProductOrderFailure,
  deleteMedicineOrderFailure,
  deleteMedicineOrderStart,
  deleteMedicineOrderSuccess,
} = orderSlice.actions;
export default orderSlice.reducer;
