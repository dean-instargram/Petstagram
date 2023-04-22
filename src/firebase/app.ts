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

// 파이어스토어로 데이터 보내는 함수 (콜렉션 이름,넣을 객체)
export function pushData(collection: string, object: object) {
  db.collection(collection)
    .add(object)
    .then(() => console.log("Data successfully written!"))
    .catch(() => console.error("Error writing data: "));
}
// 파이어스토에서 데이터 받아오는 함수  (콜렉션 이름)
export const getData = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const data = querySnapshot.docs.map((doc) => doc.data());
  console.log(data);
};

// 파이어베이스 데이터베이스에 데이터 보내는 함수 (보낼 파일, 경로, 저장 할 파일의 이름)
// 데이터베이스에 경로/저장 할 파일의 이름 으로 파일이 저장 됨
export const pushFile = (file: File, src: string, imageName: string) => {
  const storage = getStorage();
  const mountainRef = ref(storage, `${src}/${imageName}`);
  uploadBytes(mountainRef, file);
};

export default firebase;
