import { RecommendFollow, InfiniteScroll, MenuBar } from '@/components';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getUserData } from '@/redux/userData';
import { userUidState, userDataState } from '@/types/index';

import type { ReactElement } from 'react';
import { MenuBarLayout } from '@/components';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userUid = useSelector((state: userUidState) => state.userUid.value);
  const userInfo = useSelector((state: userDataState) => {
    const { isLoading, error, data } = state.userData;
    return { isLoading, error, data };
  });

  useEffect(() => {
    console.log(userUid);
    if (userUid === '0' || userUid === '로그아웃 상태') {
      router.push('/login');
    }
  }, []);

  // 로그인한 유저의 data를 redux로 관리
  useEffect(() => {
    if (userUid != '0' && userInfo.data.email === '') {
      dispatch(getUserData(userUid) as any);
    }
  }, [userUid]);

  return (
    <HomeDiv>
      <PostSection>
        <h2 className='a11y-hidden'>게시물</h2>
        <InfiniteScroll />
        {/* <UploadData /> */}
      </PostSection>
      <RecommendFollow />
    </HomeDiv>
  );
}

// getLayout으로 해당 페이지에 필요한 레이아웃 적용
Home.getLayout = function getLayout(page: ReactElement) {
  return <MenuBarLayout>{page}</MenuBarLayout>; // 공통 레이아웃만 적용
};

const HomeDiv = styled.div`
  display: flex;
  margin: 0 auto;
`;

const PostSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  margin-right: 130px;

  @media (max-width: 1300px) {
    margin-right: 0;
  }
`;
