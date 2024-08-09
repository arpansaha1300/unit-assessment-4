import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import tabsReducer from "./tabSlice";
import editSupplierReducer from "./editSupplierSlice";
import editPackageReducer from "./editPackageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tabs: tabsReducer,
    editSupplier: editSupplierReducer,
    editPackage: editPackageReducer,
  },
});

export default store;
