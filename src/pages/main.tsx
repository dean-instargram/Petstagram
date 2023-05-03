import { RecommendFollow } from '@/components';
import InfiniteScroll from '@/components/InfiniteScroll/InfiniteScroll';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserData } from '@/redux/userData';
import { User } from '@/components/InfiniteScroll/postList';
import { state, userDataState } from '@/types/index';

export default function Main() {
  const dispatch = useDispatch();
  const userUid = useSelector((state: state) => state.userUid.value);
  const userInfo = useSelector((state: userDataState) => {
    const { isLoading, error, data } = state.userData;
    return { isLoading, error, data };
  });

  useEffect(() => {
    if (userUid != '0' && userInfo.data.name === '') {
      dispatch(getUserData(userUid) as any);
    }
  }, [userUid]);

  return (
    <MainContainer>
      <MenuSection>메뉴바</MenuSection>
      <PostSection>
        <h2 className='a11y-hidden'>게시물</h2>
        <InfiniteScroll />
        {/* <UploadData /> */}
      </PostSection>
      <RecommendFollow />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MenuSection = styled.section`
  background-color: beige;
  width: 20%;
`;

const PostSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
`;
