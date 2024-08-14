/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  supplier: null,
  package: null,
  packages: [],
  quantity: "",
};

const estimationSlice = createSlice({
  name: "estimation",
  initialState: [initialState],
  reducerPath: "estimation",
  reducers: {
    updateESupplier: (state, action) => {
      state[action.payload.i].supplier = action.payload.supplier;
    },
    updateEPackages: (state, action) => {
      state[action.payload.i].packages = action.payload.packages;
    },
    updateEPackage: (state, action) => {
      state[action.payload.i].package = action.payload.package;
    },
    updateEQuantity: (state, action) => {
      state[action.payload.i].quantity = action.payload.quantity;
    },
    clearEstimation: (state) => {
      state = initialState;
    },
    addEstimationRow: (state) => {
      state.push(initialState);
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
} = estimationSlice.actions;

export default estimationSlice.reducer;
