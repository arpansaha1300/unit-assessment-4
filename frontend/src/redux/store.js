import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import tabsReducer from "./tabSlice";
import editSupplierReducer from "./editSupplierSlice";
import editPackageReducer from "./editPackageSlice";
import addSupplierSessionReducer from "./addSupplierSessionSlice";
import addPackageSessionReducer from "./addPackageSessionSlice";
import estimationReducer from "./estimationSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    tabs: tabsReducer,
    editSupplier: editSupplierReducer,
    editPackage: editPackageReducer,
    addSupplier: addSupplierSessionReducer,
    addPackage: addPackageSessionReducer,
    estimation: estimationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActionPaths: ["register", "rehydrate"] },
    }),
});

export const persistor = persistStore(store);

export default store;
