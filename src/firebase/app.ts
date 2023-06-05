import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // 이미 초기화되었다면, 초기화 된 것을 사용함
}

// //리얼 데이터 베이스
// export const realDB = firebase.database();

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export const usersRef = db.collection('users'); // 유저 정보 컬렉션
export const userWriteRef = db.collection('posts'); // 게시글 정보 컬렉션

export default firebase;
