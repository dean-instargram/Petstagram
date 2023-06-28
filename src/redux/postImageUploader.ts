import userWriteRef from "@/firebase/app";
import { ImageObj, Post } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface PostUploaderState {
  imageList: Array<File>;
  post: Post;
  focusedImageIndex: number;
}

const initialState: PostUploaderState = {
  imageList: [], // 모달창 open 또는 close 할 때, 초기화
  post: {
    user_uid: "", // 마지막단계인 submitHandler에서 값 결정
    content: "", // 마지막단계인 submitHandler에서 값 결정
    createAt: "", // 마지막단계인 submitHandler에서 값 결정
    images: [], // 마지막단계인 submitHandler에서 값 결정
    like: [],
    comment: [],
  },
  focusedImageIndex: -1,
};

const postUploaderSlice = createSlice({
  name: "PostUploader",
  initialState,
  reducers: {
    addFocusedImageIndex: (state, action) => {
      state.focusedImageIndex = state.focusedImageIndex + action.payload;
    },
    removeFocusedImage: (state) => {
      if (state.focusedImageIndex > -1) {
        state.imageList.splice(state.focusedImageIndex, 1);
        state.focusedImageIndex = state.focusedImageIndex - 1;
      }
    },
    removeSelectedImage: (state, action) => {
      if (state.imageList.length > -1) {
        state.imageList.splice(action.payload, 1);
        if (action.payload <= state.focusedImageIndex) {
          state.focusedImageIndex = state.focusedImageIndex - 1;
        }
      }
    },
    pushImageFile: (state, action) => {
      if (state.imageList.length < 5 && action.payload instanceof File) {
        state.imageList.push(action.payload);
      }
    },
    clearImageList: (state) => {
      state.imageList = [];
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setUserUid: (state, action) => {
      // state.post.user_uid = action.payload;
      state.post = { ...state.post, user_uid: action.payload };
    },
    setContent: (state, action) => {
      // state.post.content = action.payload;
      state.post = { ...state.post, content: action.payload };
    },
    setCreateAt: (state, action) => {
      // state.post.createAt = action.payload;
      state.post = { ...state.post, createAt: action.payload };
    },
    setPostImages: (state, action) => {
      // state.post.images = action.payload;
      state.post = { ...state.post, images: action.payload };
    },
  },
});

export const {
  addFocusedImageIndex,
  removeFocusedImage,
  removeSelectedImage,
  pushImageFile,
  clearImageList,
  setPost,
  setUserUid,
  setContent,
  setCreateAt,
  setPostImages,
} = postUploaderSlice.actions;
export default postUploaderSlice;
