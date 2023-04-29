// components/InfiniteScroll.tsx
import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Post, User } from './postList';
import { PostCard } from '@/components';

import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from 'firebase/firestore';
import { db } from '@/firebase/app';
import { getData } from '@/firebase/utils';

let lastVisible: any = undefined;
let isFirst = true;

interface state {
  userUid: { value: string };
}

const InfiniteScroll = (): JSX.Element => {
  const userUid = useSelector((state: state) => state.userUid.value);
  const [posts, setPosts] = useState<Post[]>([]);
  const [follows, setFollows] = useState<string[]>([userUid]);
  const [isGetFollows, setIsGetFollows] = useState<boolean>(false);

  const getNextPosts = () => {
    let q;
    if (lastVisible === -1) {
      alert('마지막 입니다~');
      return;
    } else if (lastVisible) {
      // 다음꺼 렌더링
      q = query(
        collection(db, 'posts'),
        // where('user_uid', 'in', follows),
        orderBy('createAt', 'desc'),
        limit(2),
        startAfter(lastVisible)
      );
    } else {
      // 처음 렌더링
      q = query(
        collection(db, 'posts'),
        // where('user_uid', 'in', follows),
        orderBy('createAt', 'desc'),
        limit(4)
      );
    }

    getDocs(q).then((snapshot) => {
      setPosts((posts) => {
        const postArr = [...posts];
        snapshot.forEach((doc) => {
          postArr.push(doc.data() as Post);
        });
        return postArr;
      });

      if (snapshot.docs.length === 0) {
        lastVisible = -1;
      } else {
        lastVisible = snapshot.docs[snapshot.docs.length - 1];
      }
    });
  };

  // 최초 한 번만 실행
  useEffect(() => {
    getNextPosts();
  }, []);

  // useEffect(() => {
  //   if (follows[0] == '0') setFollows([userUid]);

  //   // 유저의 팔로잉 목록 불러오기///
  //   const getUserData = async () => {
  //     if (userUid != '0') {
  //       const userData = (await getData('users', userUid)) as User;
  //       setFollows([userUid, ...userData.following]);
  //       setIsGetFollows(true);
  //     }
  //   };

  //   getUserData();
  //   console.log(follows, userUid, isGetFollows);
  // }, [userUid]);

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    // 브라우저창 내용의 크기 (스크롤을 포함하지 않음)
    const { scrollHeight } = document.body;
    // 브라우저 총 내용의 크기 (스크롤을 포함한다)
    const { scrollTop } = document.documentElement;
    // 현재 스크롤바의 위치////
    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      // scrollTop과 innerHeight를 더한 값이 scrollHeight보다 크다면, 가장 아래에 도달했다는 의미이다.
      // if (isGetFollows) {
      getNextPosts();
      // }
    }
  }, [posts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    // 스크롤이 발생할때마다 handleScroll 함수를 호출하도록 추가

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      // 해당 컴포넌트가 언마운트 될때, 스크롤 이벤트를 제거
    };
  }, [handleScroll, posts]);

  return (
    <Container>
      {posts.map((post: Post, idx: number) => (
        <PostCard key={idx} post={post} />
      ))}
    </Container>
  );
};

export default InfiniteScroll;

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 4rem auto;
`;

const PostItem = styled.div`
  width: 100%;
  height: 350px;
  border: 2px solid black;
`;
