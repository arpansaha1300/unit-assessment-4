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
    resetAuth: (state) => {
      state.isAuthenticated = false;
      state.email = "";
      state.id = "";
      state.role = "";
    },
  },
});

export const { resetAuth, setAuthenticated, setEmail, setId, setRole } =
  authSlice.actions;
export default authSlice.reducer;
