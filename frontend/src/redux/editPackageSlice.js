import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessions: {},
};

const editPackageSlice = createSlice({
  name: "edit-package",
  initialState,
  reducerPath: "edit-package",
  reducers: {
    createEditPackageSession: (state, action) => {
      const packageId = action.payload.id;
      state.sessions[packageId] = {
        packageName: action.payload.packageName,
        address: action.payload.address,
        quantity: action.payload.quantity,
      };
    },
    updateEditPackageSessionName: (state, action) => {
      const packageId = action.payload.id;
      state.sessions[packageId].packageName = action.payload.packageName;
    },
    updateEditPackageSessionAddress: (state, action) => {
      const packageId = action.payload.id;
      state.sessions[packageId].address = action.payload.address;
    },
    updateEditPackageSessionQuantity: (state, action) => {
      const packageId = action.payload.id;
      state.sessions[packageId].quantity = action.payload.quantity;
    },
    removeEditPackageSession: (state, action) => {
      delete state.sessions[action.payload.id];
    },
  },
});

export const {
  createEditPackageSession,
  removeEditPackageSession,
  updateEditPackageSessionAddress,
  updateEditPackageSessionName,
  updateEditPackageSessionQuantity,
} = editPackageSlice.actions;

export default editPackageSlice.reducer;
