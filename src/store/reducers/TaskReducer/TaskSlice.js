import { createSlice } from '@reduxjs/toolkit';
import { fetchGetTasks, fetchEditIsDone, fetchCreate, fetchEditText, fetchLogin, fetchAuthCheck } from './ActionCreator';
import jwt_decode from "jwt-decode";

const initialState = {
  tasks: [],
  page: 1,
  sortWord: null,
  sortDir: null,
  isLoading: false,
  error: '',
  numOfPages: null,
  count: null,
  alertCount: 0,
  alert: { variant: 'success', message: '' },
  user: {},
  isAuth: false,
};

const TaskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      localStorage.removeItem('token');
      state.alert = { variant: 'success', message: `You have successfully logged out` };
      state.alertCount += 1;
    },
    setPage: (state, action) => {
      state.page =action.payload;
    },
    setSortWord: (state, action) => {
      state.sortWord =action.payload;
    },
    setSortDir: (state, action) => {
      state.sortDir =action.payload;
    },
    makeAlert: (state, action) => {
      const { alertVariant, text } = action.payload;
      state.alert = { variant: alertVariant, message: text };
      state.alertCount += 1;
    },
  },
  extraReducers: {
    [fetchGetTasks.fulfilled.type]: (state, action) => {
      const { tasks, numOfPages, count } = action.payload;
      state.tasks = tasks;
      state.numOfPages = numOfPages;
      state.count = count;
      state.isLoading = false;
    },
    [fetchGetTasks.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [fetchGetTasks.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [fetchEditIsDone.fulfilled.type]: (state, action) => {
      const newTask = action.payload;
      state.tasks = state.tasks.map((task) => {
        if (task.id === newTask.id) {
          task.isDone = newTask.isDone;
        }
        return task;
      });
      state.alert = { variant: 'success', message: newTask.isDone ? `Task "${newTask.text}" completed` : `Task "${newTask.text}" not completed` };
      state.alertCount += 1;
      state.isLoading = false;
    },
    [fetchEditIsDone.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [fetchEditIsDone.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [fetchCreate.fulfilled.type]: (state, action) => {
      const task = action.payload;
      state.alert = { variant: 'success', message: `The "${task.text}" task has been created` };
      state.alertCount += 1;
      state.isLoading = false;
    },
    
    [fetchCreate.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [fetchCreate.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [fetchEditText.fulfilled.type]: (state, action) => {
      const newTask = action.payload;
      let oldTaskText;
      state.tasks = state.tasks.map((task) => {
        if (task.id === newTask.id) {
          oldTaskText = task.text;
          task.text = newTask.text;
          task.isEditByAdmin = newTask.isEditByAdmin;
        }
        return task;
      });
      state.alert = { variant: 'success', message: `The task "${oldTaskText}" has been changed to "${newTask.text}"` };
      state.alertCount += 1;
      state.isLoading = false;
    },
    [fetchEditText.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [fetchEditText.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.alert = { variant: 'danger', message: `log in to change the task` };
      state.alertCount += 1;
      state.error = action.error;
    },
    [fetchLogin.fulfilled.type]: (state, action) => {
      const { token } = action.payload;
      localStorage.setItem('token', token)
      state.user = jwt_decode(token);
      state.isAuth = true;
      state.alert = { variant: 'success', message: `You have successfully logged in` };
      state.alertCount += 1;
      state.isLoading = false;
    },
    [fetchLogin.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [fetchLogin.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.alert = { variant: 'danger', message: `Invalid login or password` };
      state.alertCount += 1;
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

export const { setPage, setSortWord, setSortDir, makeAlert, logout } = TaskSlice.actions;


export default TaskSlice.reducer;