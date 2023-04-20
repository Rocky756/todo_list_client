import {combineReducers, configureStore} from "@reduxjs/toolkit";
import TaskReducer from "./reducers/TaskReducer/TaskSlice";

const rootReducer = combineReducers({
  TaskReducer,
})

export const setupStore  = () => {
  return configureStore({
    reducer: rootReducer,
  })
}