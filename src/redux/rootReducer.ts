import { baseApi } from "./api/baseApi";
import searchReducer from './slice/searchSlice';
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  search: searchReducer,
  // Add other reducers as needed
});

export default rootReducer;
