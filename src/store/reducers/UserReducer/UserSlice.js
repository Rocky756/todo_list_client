import { createSlice } from '@reduxjs/toolkit';
import { fetchLogin, fetchAuthCheck } from './ActionCreator';
import jwt_decode from "jwt-decode";

const initialState = {
  user: {},
  isAuth: false,
  isLoading: false,
  error: '',
  alertCountUser: 0,
  alertUser: { variant: 'success', message: '' },
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: {
    [fetchLogin.fulfilled.type]: (state, action) => {
      const { token } = action.payload;
      localStorage.setItem('token', token)
      state.user = jwt_decode(token);
      state.isAuth = true;
      state.isLoading = false;
    },
    [fetchLogin.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [fetchLogin.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.alertUser = { variant: 'danger', message: `log in to change the task` };
      state.alertCountUser += 1;
      state.error = action.error;
    },
    [fetchAuthCheck.fulfilled.type]: (state, action) => {
      const { token } = action.payload;
      localStorage.setItem('token', token)
      state.user = jwt_decode(token);
      state.isAuth = true;
      state.isLoading = false;
    },
    [fetchAuthCheck.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [fetchAuthCheck.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },

});

export const { logout } = UserSlice.actions;


export default UserSlice.reducer;