import { $authHost, $host } from "../../../http";
import jwt_decode from "jwt-decode";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetTasks = createAsyncThunk(
  'task/get',
  async ({ page, sortWord, sortDir }, thunkAPI) => {
      try {
        const params = {};

        if (page) {
          params.page = page;
        }
        if (sortWord) {
          params.sortWord = sortWord;
        }
        if (sortDir) {
          params.sortDir = sortDir;
        }

        const queryString = Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join("&");

        const response = await $host.get(`task?${queryString}`);
        return response.data;
      } catch (e) {
          return thunkAPI.rejectWithValue("Ошибка запроса задач");
      }
  }
)

export const fetchCreate = createAsyncThunk(
  'task/create',
  async ({ name, email, text }, thunkAPI) => {
    try {
      const { data } = await $host.post(`task`, {name, email, text});
      console.log(data);
      return data;
    } catch (e) {
        return thunkAPI.rejectWithValue("");
    }
  }
)

export const fetchEditIsDone = createAsyncThunk(
  'task/isDone',
  async ({ id, isDone }, thunkAPI) => {
      try {
        console.log(id, isDone);
        const { data } = await $authHost.patch(`task/isdone?id=${id}`, {isDone});
        console.log(data);
        return data;
      } catch (e) {
        console.log(e);
          return thunkAPI.rejectWithValue("");
      }
  }
)

export const fetchEditText = createAsyncThunk(
  'task/text',
  async ({ id, text, isEditByAdmin }, thunkAPI) => {
      try {
        console.log(id, text, isEditByAdmin);
        const { data } = await $authHost.patch(`task/text?id=${id}`, { text, isEditByAdmin });
        console.log(data);
        return data;
      } catch (e) {
        console.log(e);
          return thunkAPI.rejectWithValue("");
      }
  }
)

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