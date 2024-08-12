import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  address: "",
  quantity: "",
  supplier: null,
};

const addPackageSessionSlice = createSlice({
  name: "add-package",
  initialState,
  reducerPath: "add-package",
  reducers: {
    updateAddPackageSessionName: (state, action) => {
      state.name = action.payload;
    },
    updateAddPackageSessionAddress: (state, action) => {
      state.address = action.payload;
    },
    updateAddPackageSessionQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    updateAddPackageSessionSupplier: (state, action) => {
      state.supplier = action.payload;
    },
    clearAddPackageSession: (state) => {
      state.name = "";
      state.address = "";
      state.quantity = "";
      state.supplier = null;
    },
  },
});

export const {
  updateAddPackageSessionAddress,
  updateAddPackageSessionName,
  updateAddPackageSessionQuantity,
  updateAddPackageSessionSupplier,
  clearAddPackageSession,
} = addPackageSessionSlice.actions;

export default addPackageSessionSlice.reducer;
