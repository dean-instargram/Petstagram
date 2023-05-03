import { useState, useEffect } from 'react';
import { FollowList, UserList } from '@/components';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import styled from 'styled-components';
import { state, userDataState } from '@/types/index';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/app';
import { User } from '@/types/index';

export function RecommendFollow() {
  const userUid = useSelector((state: state) => state.userUid.value);
  const userInfo = useSelector((state: userDataState) => {
    const { isLoading, error, data } = state.userData;
    return { isLoading, error, data };
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [follows, setFollows] = useState<string[]>();

  useEffect(() => {
    console.log(userUid, follows);
    if (follows != undefined) {
      follows.forEach((uid) => {
        getFollowingList(uid);
      });
    }
  }, [follows]);

  useEffect(() => {
    if (!userInfo.isLoading && follows === undefined) {
      setIsLoading(userInfo.isLoading);
      setFollows([...userInfo.data.following]);
    }
  }, [userInfo]);

  const getFollowingList = async (uid: string) => {
    const userDataRef = doc(db, 'users', uid);
    const userDataSnapshot = await getDoc(userDataRef);
    if (userDataSnapshot.exists()) {
      const userData = userDataSnapshot.data() as User;
      console.log(userData.following);
    }
  };

  const userData = {
    email: 'to06109@naver.com',
    profile_url:
      'https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg',
    nickname: '멍뭉이0',
  };
  const testImageObject = [
    {
      email: 'bsw@naver.com',
      profile_url:
        'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG',
      nickname: '멍뭉이1',
    },
    {
      email: 'yesong@naver.com',
      profile_url:
        'https://interbalance.org/wp-content/uploads/2021/08/flouffy-VBkIK3qj3QE-unsplash-scaled-e1631077364762.jpg',
      nickname: '멍뭉이2',
    },
    {
      email: 'bsw@naver.com',
      profile_url:
        'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG',
      nickname: '멍뭉이1',
    },
    {
      email: 'yesong@naver.com',
      profile_url:
        'https://interbalance.org/wp-content/uploads/2021/08/flouffy-VBkIK3qj3QE-unsplash-scaled-e1631077364762.jpg',
      nickname: '멍뭉이2',
    },
    {
      email: 'bsw@naver.com',
      profile_url:
        'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG',
      nickname: '멍뭉이1',
    },
  ];

  return (
    <FollowArticle>
      <UserList profile={userData} />
      <TitleBox>
        <h2>회원님을 위한 추천</h2>
        <Link href='/main'>모두 보기</Link>
      </TitleBox>
      {testImageObject.map((profile, index) => {
        return <FollowList key={index} profile={profile} />;
      })}
    </FollowArticle>
  );
}

const FollowArticle = styled.section`
  width: 420px;
  padding: 34px 25px 20px 25px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 25px;
`;
