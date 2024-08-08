import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import tabsReducer from "./tabSlice";
import editSupplierReducer from "./editSupplierSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tabs: tabsReducer,
    editSupplier: editSupplierReducer,
  },
});

export default store;
