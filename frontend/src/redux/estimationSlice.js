/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAllDirty: false,
  rows: [
    {
      supplier: null,
      package: null,
      packages: [],
      quantity: "",
    },
  ],
};

const estimationSlice = createSlice({
  name: "estimation",
  initialState,
  reducerPath: "estimation",
  reducers: {
    updateESupplier: (state, action) => {
      state.rows[action.payload.i].supplier = action.payload.supplier;
    },
    updateEPackages: (state, action) => {
      state.rows[action.payload.i].packages = action.payload.packages;
    },
    updateEPackage: (state, action) => {
      state.rows[action.payload.i].package = action.payload.package;
    },
    updateEQuantity: (state, action) => {
      state.rows[action.payload.i].quantity = action.payload.quantity;
    },
    clearEstimation: (state) => {
      state = initialState;
    },
    addEstimationRow: (state) => {
      state.rows.push({
        supplier: null,
        package: null,
        packages: [],
        quantity: "",
      });
    },
    deleteEstimationRow: (state, action) => {
      state.rows.splice(action.payload.i, 1);
    },
  },
});

export const {
  clearEstimation,
  updateEPackage,
  updateEPackages,
  updateEQuantity,
  updateESupplier,
  addEstimationRow,
  deleteEstimationRow,
} = estimationSlice.actions;

export default estimationSlice.reducer;
