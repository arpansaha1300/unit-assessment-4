import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  address: "",
  quantity: "",
  supplierId: "",
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
    updateAddPackageSessionSupplierId: (state, action) => {
      state.supplierId = action.payload;
    },
    clearAddPackageSession: (state) => {
      state.name = "";
      state.address = "";
      state.quantity = "";
      state.supplierId = "";
    },
  },
});

export const {
  updateAddPackageSessionAddress,
  updateAddPackageSessionName,
  updateAddPackageSessionQuantity,
  updateAddPackageSessionSupplierId,
  clearAddPackageSession,
} = addPackageSessionSlice.actions;

export default addPackageSessionSlice.reducer;
