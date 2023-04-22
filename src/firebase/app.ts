import firebase from "firebase/compat/app";
import { getStorage, uploadBytes, ref } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWOla15HC63D07Sw1zkrvwofQtJf45Vx8",
  authDomain: "petstagram-fe291.firebaseapp.com",
  projectId: "petstagram-fe291",
  storageBucket: "petstagram-fe291.appspot.com",
  messagingSenderId: "440336677151",
  appId: "1:440336677151:web:8f8d8e93cf46d582cb582a",
  measurementId: "G-ZBMHJB9CVD",
};

// const {
//   VITE_API_KEY,
//   VITE_AUTH_DOMAIN,
//   VITE_PROJECT_ID,
//   VITE_MESSAGE_SENDER_ID,
//   VITE_STORAGE_BUCKET,
//   VITE_APP_ID,
// } = process.env;

// const firebaseConfig = {
//   apiKey: VITE_API_KEY,
//   authDomain: VITE_AUTH_DOMAIN,
//   projectId: VITE_PROJECT_ID,
//   storageBucket: VITE_STORAGE_BUCKET,
//   messagingSenderId: VITE_MESSAGE_SENDER_ID,
//   appId: VITE_APP_ID,
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// //리얼 데이터 베이스
// export const realDB = firebase.database();

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export const usersRef = db.collection("users"); // 유저 정보 컬렉션
export const userWriteRef = db.collection("UserWrite"); // 게시글 정보 컬렉션

export default firebase;
