import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  map: {},
};

const tabSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createOrUpdateTab: (state, action) => {
      if (typeof action.payload === "string") {
        state.map[action.payload] = {
          name: getRouteName(action.payload),
          path: action.payload,
        };
      } else {
        state.map[action.payload.path] = {
          name: getRouteName(action.payload.path, action.payload.data),
          path: action.payload.path,
        };
      }
    },
    removeTab: (state, action) => {
      delete state.tabs[action.payload.path];
    },
  },
});

export const { createOrUpdateTab, removeTab } = tabSlice.actions;

export default tabSlice.reducer;

function getRouteName(path, data) {
  switch (path) {
    case "/package-list": {
      return "Packages";
    }
    case "/suppliers-list": {
      return "Suppliers";
    }
    default: {
      if (path.startsWith("/suppliers-list") && path.endsWith("/edit")) {
        const supplier = data;
        if (!supplier) return "Edit Supplier";
        return supplier.name + " | Edit Supplier";
      }
    }
  }
}
