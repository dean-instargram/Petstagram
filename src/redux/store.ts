import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import rootReducer from "@/modules";
import userUidReduce from "./userUid";
import counterReduce from "./counter";
import postUploadModalSlice from "./postUploadModal";

const rootReducer = combineReducers({
  userUid: userUidReduce,
  counter: counterReduce,
  postUploadModalSlice: postUploadModalSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
