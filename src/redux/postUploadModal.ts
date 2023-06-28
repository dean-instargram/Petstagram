import { createSlice } from "@reduxjs/toolkit";
import firebase from "@/firebase/app";

export interface PostUploadModalState {
  isOpen: boolean;
  curContentIndex: number;
  nextBtnActived: boolean;
  prevBtnActived: boolean;
  contentLength: number;
  isEnded: boolean;
}

const initialState: PostUploadModalState = {
  isOpen: false,
  curContentIndex: 0,
  nextBtnActived: false,
  prevBtnActived: false,
  contentLength: 0,
  isEnded: false,
};

const postUploadModalSlice = createSlice({
  name: "PostUploadModal",
  initialState,
  reducers: {
    open: (state, action) => {
      state.isOpen = true;
      state.curContentIndex = 0;
      state.nextBtnActived = false;
      state.prevBtnActived = false;
      state.contentLength = action.payload;
      state.isEnded = false;
    },
    close: (state) => {
      state.isOpen = false;
      state.curContentIndex = 0;
      // state.nextBtnActived = false;
      // state.prevBtnActived = false;
      state.contentLength = 0;
      state.isEnded = false;
    },
    addCurContentIndex: (state, action) => {
      if (state.curContentIndex + action.payload >= state.contentLength) {
        state.isEnded = true;
      } else if (state.curContentIndex + action.payload >= 0) {
        // console.log("state.curContentIndex + action.payload", state.curContentIndex + action.payload);

        state.curContentIndex = state.curContentIndex + action.payload;
      }
    },
    setNextBtnActive: (state, action) => {
      state.nextBtnActived = action.payload;
    },
    setPrevBtnActive: (state, action) => {
      state.prevBtnActived = action.payload;
    },
  },
});

export const { open, close, addCurContentIndex, setNextBtnActive, setPrevBtnActive } = postUploadModalSlice.actions;
export default postUploadModalSlice;
