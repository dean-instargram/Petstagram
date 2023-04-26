// components/InfiniteScroll.tsx
import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/userUid';
import { postType, getPostList } from './postList';

interface state {
  userUid: { value: string };
}

const InfiniteScroll = (): JSX.Element => {
  const userUid = useSelector((state: state) => state.userUid.value);
  console.log('유저아이디', userUid);
  // 리덕스에서 유저아이디 받기

  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<postType[]>(getPostList(1));
  // 요청할 페이지 번호 변수

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    // 브라우저창 내용의 크기 (스크롤을 포함하지 않음)

    const { scrollHeight } = document.body;
    // 브라우저 총 내용의 크기 (스크롤을 포함한다)

    const { scrollTop } = document.documentElement;
    // 현재 스크롤바의 위치

    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      // scrollTop과 innerHeight를 더한 값이 scrollHeight보다 크다면, 가장 아래에 도달했다는 의미이다.

      setPosts(posts.concat(getPostList(page + 1)));
      // 페이지에 따라서 불러온 배열을 posts 배열과 합쳐줍니다.

      setPage((prevPage: number) => prevPage + 1);
      // 페이지 state 변수의 값도 1씩 늘려줍니다.
    }
  }, [page, posts]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    // 스크롤이 발생할때마다 handleScroll 함수를 호출하도록 추가합니다.

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      // 해당 컴포넌트가 언마운트 될때, 스크롤 이벤트를 제거합니다.
    };
  }, [handleScroll]);

  return (
    <Container>
      {posts.map((post: postType, idx: number) => (
        <PostItem key={idx}>{post.contents}</PostItem>
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
