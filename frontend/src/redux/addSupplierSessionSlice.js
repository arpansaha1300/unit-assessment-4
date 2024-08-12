import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  contactInfo: "",
  password: "",
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
    updateAddSupplierSessionPassword: (state, action) => {
      state.password = action.payload;
    },
    removeAddSupplierSession: (state) => {
      state.name = "";
      state.email = "";
      state.contactInfo = "";
      state.password = "";
    },
  },
});

export const {
  removeAddSupplierSession,
  updateAddSupplierSessionContact,
  updateAddSupplierSessionEmail,
  updateAddSupplierSessionPassword,
  updateAddSupplierSessionName,
} = addSupplierSessionSlice.actions;

export default addSupplierSessionSlice.reducer;
