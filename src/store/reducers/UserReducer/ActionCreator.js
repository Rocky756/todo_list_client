import { $authHost, $host } from "../../../http";
import jwt_decode from "jwt-decode";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLogin = createAsyncThunk(
  'user/login',
  async ({ name, password }, thunkAPI) => {
    try {
      const { data } = await $host.post(`user/login`, {name, password});
      return data;
    } catch (e) {
        return thunkAPI.rejectWithValue("");
    }
  }
)

export const fetchAuthCheck = createAsyncThunk(
  'user/check',
  async (_, thunkAPI) => {
    try {
      const { data } = await $authHost.get(`user/auth`);
      return data;
    } catch (e) {
        return thunkAPI.rejectWithValue("");
    }
  }
)