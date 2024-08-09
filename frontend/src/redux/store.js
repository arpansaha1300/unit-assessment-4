import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import tabsReducer from "./tabSlice";
import editSupplierReducer from "./editSupplierSlice";
import editPackageReducer from "./editPackageSlice";
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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActionPaths: ["register", "rehydrate"] },
    }),
});

export const persistor = persistStore(store);

export default store;
