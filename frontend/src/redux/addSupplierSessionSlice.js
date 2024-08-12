import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  contactInfo: "",
};

const addSupplierSessionSlice = createSlice({
  name: "add-supplier",
  initialState,
  reducerPath: "add-supplier",
  reducers: {
    updateAddSupplierSessionName: (state, action) => {
      state.name = action.payload;
    },
    updateAddSupplierSessionEmail: (state, action) => {
      state.email = action.payload;
    },
    updateAddSupplierSessionContact: (state, action) => {
      state.contactInfo = action.payload;
    },
    clearAddSupplierSession: (state) => {
      state.name = "";
      state.email = "";
      state.contactInfo = "";
    },
  },
});

export const {
  clearAddSupplierSession,
  updateAddSupplierSessionContact,
  updateAddSupplierSessionEmail,
  updateAddSupplierSessionName,
} = addSupplierSessionSlice.actions;

export default addSupplierSessionSlice.reducer;
