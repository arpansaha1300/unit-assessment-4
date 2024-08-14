import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  map: {},
};

const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducerPath: "tabs",
  reducers: {
    createOrUpdateTab: (state, action) => {
      const payloadIsString = typeof action.payload === "string";
      const path = payloadIsString ? action.payload : action.payload.path;
      const type = getRouteType(path);
      const name = payloadIsString
        ? getRouteName(path)
        : getRouteName(path, action.payload.data);

      state.map[path] = { name, path, type };

      if (["edit-supplier", "edit-package"].includes(type)) {
        state.map[path].data = { id: action.payload.data.id };
      }
    },
    removeTab: (state, action) => {
      delete state.map[action.payload.path];
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
    case "/add-supplier": {
      return "Add Supplier";
    }
    case "/add-package": {
      return "Add Package";
    }
    case "/estimation": {
      return "Estimation";
    }
    default: {
      if (path.startsWith("/suppliers-list") && path.endsWith("/edit")) {
        const supplier = data;
        if (!supplier) return "Edit Supplier";
        return supplier.name.split(" ")[0] + " | Edit Supplier";
      }
      if (path.startsWith("/package-list") && path.endsWith("/edit")) {
        const pkg = data;
        if (!pkg) return "Edit Package";
        return pkg.packageName.split(" ")[0] + " | Edit Package";
      }
    }
  }
}

function getRouteType(path) {
  switch (path) {
    case "/package-list": {
      return "packages";
    }
    case "/suppliers-list": {
      return "suppliers";
    }
    case "/add-supplier": {
      return "add-supplier";
    }
    case "/add-package": {
      return "add-package";
    }
    case "/estimation": {
      return "estimation";
    }
    default: {
      if (path.startsWith("/suppliers-list") && path.endsWith("/edit")) {
        return "edit-supplier";
      }
      if (path.startsWith("/package-list") && path.endsWith("/edit")) {
        return "edit-package";
      }
    }
  }
}
