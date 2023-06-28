import firebase from "@/firebase/app";

export interface User {
  name: string;
  nickname: string;
  email: string;
  post_uid: string[] | null;
  introduce: string | null;
  profile_url: string;
  phone: string | null;
  followers: string[] | null;
  following: string[];
  scrap: string[] | null;
}

interface Recomment {
  user_uid: string;
  email: string;
  content: string;
  createAt: string | firebase.firestore.FieldValue;
  like: string[];
}

export interface Comment {
  user_uid: string;
  email: string;
  content: string;
  createAt: string | firebase.firestore.FieldValue;
  like: string[];
  recomment: Recomment[];
}

export interface ImageObj {
  src: string;
  alt: string;
}

export type CreateAtType = {
  seconds: number;
  nanoseconds: number;
};

export type Post = {
  user_uid: string;
  content: string;
  createAt: string | firebase.firestore.FieldValue | CreateAtType;
  images: ImageObj[];
  like: string[];
  comment: Comment[];
};
