import { useState, useEffect } from 'react';
import { FollowList, UserList } from '@/components';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import styled from 'styled-components';
import { state, userDataState } from '@/types/index';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/app';
import { User } from '@/components/InfiniteScroll/postList';

interface FollowingObject {
  [followingUid: string]: string[];
}

export function RecommendFollow() {
  const userUid = useSelector((state: state) => state.userUid.value);
  const userInfo = useSelector((state: userDataState) => {
    const { isLoading, error, data } = state.userData;
    return { isLoading, error, data };
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [follows, setFollows] = useState<string[]>();
  const [followingObject, setFollowingObject] = useState<FollowingObject>({});
  const [recommendFollowing, setRecommendFollowing] = useState<FollowingObject>(
    {}
  );

  useEffect(() => {
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

  useEffect(() => {
    if (followingObject != undefined) {
      const sortedFollowList = Object.fromEntries(
        Object.entries(followingObject).sort(
          (a: [string, string[]], b: [string, string[]]): number => {
            return b[1].length - a[1].length;
          }
        )
      );
      for (const [key, value] of Object.entries(sortedFollowList)) {
        if (Object.keys(recommendFollowing).length >= 5) {
          break;
        }
        setRecommendFollowing((prevRecommend) => {
          const newRecommendFollowing = { ...prevRecommend };
          newRecommendFollowing[key] = value;
          return newRecommendFollowing;
        });
      }
    }
  }, [followingObject]);

  const getFollowingList = async (uid: string) => {
    const userDataRef = doc(db, 'users', uid);
    const userDataSnapshot = await getDoc(userDataRef);
    if (userDataSnapshot.exists()) {
      const userData = userDataSnapshot.data() as User;
      pushFollowingList(userData.following, uid);
    }
  };

  const pushFollowingList = (followingList: string[], loginUserUid: string) => {
    setFollowingObject((prevFollowingObject) => {
      const newFollowingObject = { ...prevFollowingObject };
      followingList.forEach((followingUserUid) => {
        if (!newFollowingObject[followingUserUid]) {
          newFollowingObject[followingUserUid] = [loginUserUid];
        } else {
          if (!newFollowingObject[followingUserUid].includes(loginUserUid)) {
            newFollowingObject[followingUserUid].push(loginUserUid);
          }
        }
      });
      return newFollowingObject;
    });
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
      {Object.entries(recommendFollowing)?.map(
        ([key, value]: [string, string[]]) => {
          return (
            <>
              <p>추천할 사람: {key}</p>
              <p>
                그 사람을 팔로하는 사람들:{' '}
                {value.map((user) => {
                  return <div>{user}</div>;
                })}
              </p>
              <br />
            </>
          );
        }
      )}
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
