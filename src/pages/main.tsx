import { RecommendFollow, InfiniteScroll, MenuBar } from '@/components';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserData } from '@/redux/userData';
import { userUidState, userDataState } from '@/types/index';

export default function Main() {
  const dispatch = useDispatch();
  const userUid = useSelector((state: userUidState) => state.userUid.value);
  const userInfo = useSelector((state: userDataState) => {
    const { isLoading, error, data } = state.userData;
    return { isLoading, error, data };
  });

  // 로그인한 유저의 data를 redux로 관리
  useEffect(() => {
    if (userUid != '0' && userInfo.data.email === '') {
      dispatch(getUserData(userUid) as any);
    }
  }, [userUid]);

  return (
    <MainContainer>
      <MenuBar></MenuBar>
      <HomeDiv>
        <PostSection>
          <h2 className='a11y-hidden'>게시물</h2>
          <InfiniteScroll />
          {/* <UploadData /> */}
        </PostSection>
        <RecommendFollow />
      </HomeDiv>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  margin-right: 130px;

  @media (max-width: 1300px) {
    margin-right: 0;
  }
`;

const HomeDiv = styled.div`
  display: flex;
  margin: 0 auto;
`;
