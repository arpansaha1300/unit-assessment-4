import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessions: {},
};

const editSupplierSlice = createSlice({
  name: "edit-supplier",
  initialState,
  reducerPath: "edit-supplier",
  reducers: {
    createEditSupplierSession: (state, action) => {
      const supplierId = action.payload.id;
      state.sessions[supplierId] = {
        name: action.payload.name,
        email: action.payload.email,
        contactInfo: action.payload.contactInfo,
        discount:action.payload.discount,
      };
    },
    updateEditSupplierSessionName: (state, action) => {
      const supplierId = action.payload.id;
      state.sessions[supplierId].name = action.payload.name;
    },
    updateEditSupplierSessionEmail: (state, action) => {
      const supplierId = action.payload.id;
      state.sessions[supplierId].email = action.payload.email;
    },
    updateEditSupplierSessionContact: (state, action) => {
      const supplierId = action.payload.id;
      state.sessions[supplierId].contactInfo = action.payload.contactInfo;
    },
    updateEditSupplierSessionDiscount: (state, action) => {
      const supplierId = action.payload.id;
      state.sessions[supplierId].discount = action.payload.discount;
    },
    removeEditSupplierSession: (state, action) => {
      delete state.sessions[action.payload.id];
    },
  },
});

export const {
  createEditSupplierSession,
  updateEditSupplierSessionContact,
  updateEditSupplierSessionEmail,
  updateEditSupplierSessionName,
  updateEditSupplierSessionDiscount,
  removeEditSupplierSession,
} = editSupplierSlice.actions;

export default editSupplierSlice.reducer;
