//npm install redux react-redux
//npm install @reduxjs/toolkit

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

