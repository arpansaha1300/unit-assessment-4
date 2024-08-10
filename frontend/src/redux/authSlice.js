import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: null,
  email: "",
  id: "",
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = "";
      state.id = "";
      state.role = "";
    },
    init: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setAuthenticated, setEmail, setRole, setId, logout, init } =
  authSlice.actions;
export default authSlice.reducer;
