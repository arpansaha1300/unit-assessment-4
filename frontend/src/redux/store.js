import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tabsReducer from './tabSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tabs: tabsReducer,
  },
});

export default store;
