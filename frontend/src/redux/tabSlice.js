import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  map: {},
};

const tabSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createOrUpdateTab: (state, action) => {
      const newTab = { ...action.payload };
      state.map[newTab.path] = newTab;
    },
    removeTab: (state, action) => {
      delete state.tabs[action.payload.path];
    },
  },
});

export const { createOrUpdateTab, removeTab } = tabSlice.actions;

export default tabSlice.reducer;
