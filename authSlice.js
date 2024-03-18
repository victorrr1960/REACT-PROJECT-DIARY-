import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  
  initialState: {
    isAuthenticated: false,
    username: null,
    sessionKey: null
  },

  reducers: {
    login: (state, action) => {
      console.log('reducer is called');
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.sessionKey = action.payload.sessionKey;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.username = null;
      state.sessionKey = null;
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
