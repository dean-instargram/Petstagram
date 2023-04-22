// import { auth } from "@/firebase/app";
import { auth, db, pushData, usersRef } from "@/firebase/app";
import firebase from "firebase/compat/app";
import Link from "next/link";
import { useRef, useState } from "react";
import styled from "styled-components";

interface FormState {
  email: string;
  password: string;
  displayName: string;
}

export default function Signup() {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    displayName: "",
  });
  const [onButton, setonButton] = useState<boolean>(true);
  const [onPassword, setonPassword] = useState<boolean>(true);
  const [onDuplicate, setonDuplicate] = useState<boolean>(true);
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const checkDuplicate = async () => {
    const emailSnapshot = await usersRef
      .where("email", "==", formState.email)
      .get();
    if (!emailSnapshot.empty) {
      alert("이미 존재하는 아이디입니다.");
    } else {
      alert("사용가능한 아이디입니다.");
    }
  };
  const confirmInputChange = () => {
    if (passwordRef.current.value == confirmPasswordRef.current.value) {
      setonPassword(true);
    } else {
      setonPassword(false);
    }
  };
  const signup = async () => {
    // setonButton(false);
    try {
      await auth
        .createUserWithEmailAndPassword(formState.email, formState.password)
        .then((userData) => {
          const user: any = userData.user;
          console.log("User created:", user.uid);

          usersRef.doc(user.uid).set({
            name: formState.displayName,
            email: user.email,
            post_uid: [],
            introduce: "",
            profile_url: "",
            phone: "",
            followers: [],
            following: [],
            scrap: [],
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: { target: { id: string; value: string } }) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <Article>
      <Form>
        <p>반려동물을 위한 커뮤니티에 가입하세요.</p>
        <label htmlFor="email">
          이메일:
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={handleInputChange}
            required
          />
          <button onClick={checkDuplicate}>중복확인</button>
        </label>
        <label htmlFor="displayName">
          사용자 이름:
          <input
            type="text"
            id="displayName"
            value={formState.displayName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="password">
          비밀번호:
          <input
            type="password"
            id="password"
            ref={passwordRef}
            value={formState.password}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="confirmPassword">
          비밀번호 확인:
          <input
            type="password"
            ref={confirmPasswordRef}
            onChange={confirmInputChange}
            required
          />
        </label>
        {onPassword ? null : <p>비밀번호가 틀립니다.</p>}
        <button
          type="submit"
          onClick={signup}
          disabled={onButton ? false : true}
        >
          가입
        </button>
        <Link href="/login">로그인하기</Link>
      </Form>
    </Article>
  );
}

const Article = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Form = styled.form`
  border: 1px solid black;
  max-width: 398px;
  min-width: 320px;
  display: flex;
  flex-flow: column;
`;
