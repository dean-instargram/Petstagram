// lib/postList.ts
import firebase from '@/firebase/app';

interface Recomment {
  user_uid: string;
  content: string;
  createAt: string | firebase.firestore.FieldValue;
  like: string[];
}

interface Comment {
  user_uid: string;
  content: string;
  createAt: string | firebase.firestore.FieldValue;
  like: string[];
  recomment: Recomment[];
}

interface Image {
  src: string;
  alt: string;
}

export type Post = {
  user_uid: string;
  content: string;
  createAt: string | firebase.firestore.FieldValue;
  images: Image[];
  like: string[];
  comment: Comment[];
};
