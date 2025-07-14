import { createSlice } from "@reduxjs/toolkit";

const medicineSlice = createSlice({
  name: "medicine",
  initialState: {
    medicineList: [],
    prescriptionList: [],
    medicine: {},
    isLoading: false,
    error: false,
  },
  reducers: {
    // get all medicine
    getMedicineStart: (state) => {
      state.isLoading = true;
    },
    getMedicineSuccess: (state, action) => {
      state.isLoading = false;
      state.medicineList = action.payload;
      state.error = false;
    },
    getMedicineFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // get Single medicine
    getSingleMedicineStart: (state) => {
      state.isLoading = true;
    },
    getSingleMedicineSuccess: (state, action) => {
      state.isLoading = false;
      state.medicineList = action.payload;
      state.error = false;
    },
    getSingleMedicineFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // update medicine
    updateMedicineStart: (state) => {
      state.isLoading = true;
    },
    updateMedicineSuccess: (state, action) => {
      state.isLoading = false;
      state.medicine = action.payload;
      state.error = false;
    },
    updateMedicineFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // add new medicine
    addMedicineStart: (state) => {
      state.isLoading = true;
    },
    addMedicineSuccess: (state, action) => {
      state.isLoading = false;
      state.medicine = action.payload;
      state.error = false;
    },
    addMedicineFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // delete medicine

    deleteMedicineStart: (state) => {
      state.isLoading = true;
      state.error = false;
    },
    deleteMedicineSuccess: (state, action) => {
      state.isLoading = false;
      const deleteMedicine = state.medicineList.filter(
        (item: any) => item._id !== action.payload
      );
      state.medicineList = deleteMedicine;
      state.error = false;
    },

    deleteMedicineFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // get all prescription
    getPrescriptionStart: (state) => {
      state.isLoading = true;
    },
    getPrescriptionSuccess: (state, action) => {
      state.isLoading = false;
      state.prescriptionList = action.payload;
      state.error = false;
    },
    getPrescriptionFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // delete prescription
    deletePrescriptionStart: (state) => {
      state.isLoading = true;
    },
    deletePrescriptionSuccess: (state, action) => {
      state.isLoading = false;
      const deletedPrescription = state.prescriptionList.filter(
        (item: any) => item._id !== action.payload
      );
      state.prescriptionList = deletedPrescription;
      state.error = false;
    },
    deletePrescriptionFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getMedicineStart,
  getMedicineSuccess,
  getMedicineFailure,
  getSingleMedicineStart,
  getSingleMedicineSuccess,
  getSingleMedicineFailure,
  updateMedicineStart,
  updateMedicineSuccess,
  updateMedicineFailure,
  addMedicineStart,
  addMedicineSuccess,
  addMedicineFailure,
  deleteMedicineStart,
  deleteMedicineSuccess,
  deleteMedicineFailure,
  getPrescriptionStart,
  getPrescriptionSuccess,
  getPrescriptionFailure,
  deletePrescriptionStart,
  deletePrescriptionSuccess,
  deletePrescriptionFailure,
} = medicineSlice.actions;

export default medicineSlice.reducer;
