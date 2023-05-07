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

type recommendUserListProps = {
  email: string;
  profile_url: string;
  paragraph: string;
};

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
  const [recommendProfile, setRecommendProfile] = useState<
    recommendUserListProps[]
  >([]);

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

  useEffect(() => {
    const getRecommendData = async (key: string, value: string[]) => {
      let followerParagraph = '';
      let recommendData = {
        email: '',
        profile_url: '',
        paragraph: '',
      };

      // 0번째 팔로하는 user email 불러오기
      const userEmailRef = doc(db, 'users', value[0]);
      const userEmailSnapshot = await getDoc(userEmailRef);
      if (userEmailSnapshot.exists()) {
        const userEmailData = userEmailSnapshot.data() as User;
        const userId = userEmailData.email.split('@')[0];
        if (value.length === 1)
          followerParagraph = `${userId}님이 팔로우합니다`;
        else
          followerParagraph = `${userId}님 외 ${
            value.length - 1
          }명이 팔로우합니다`;
      }

      // 추천 팔로잉 data 불러오기
      const recommendDataRef = doc(db, 'users', key);
      const recommendDataSnapshot = await getDoc(recommendDataRef);
      if (recommendDataSnapshot.exists()) {
        const userData = recommendDataSnapshot.data() as User;
        recommendData = {
          ...recommendData,
          email: userData.email,
          profile_url: userData.profile_url,
          paragraph: followerParagraph,
        };
      }

      setRecommendProfile((prevData) => {
        const newRecommendData = [...prevData];
        newRecommendData.push(recommendData);
        return newRecommendData;
      });
    };

    const initState = () => {
      setRecommendProfile([]);
    };

    const startInit = async () => {
      await initState();
    };

    startInit();
    Object.entries(recommendFollowing)?.map(([key, value]) => {
      getRecommendData(key, value);
    });
  }, [recommendFollowing]);

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

  //   {
  //     email: 'bsw@naver.com',
  //     profile_url:
  //       'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG',
  //     nickname: '멍뭉이1',
  //   },
  //   {
  //     email: 'yesong@naver.com',
  //     profile_url:
  //       'https://interbalance.org/wp-content/uploads/2021/08/flouffy-VBkIK3qj3QE-unsplash-scaled-e1631077364762.jpg',
  //     nickname: '멍뭉이2',
  //   },
  //   {
  //     email: 'bsw@naver.com',
  //     profile_url:
  //       'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG',
  //     nickname: '멍뭉이1',
  //   },
  //   {s
  //     email: 'yesong@naver.com',
  //     profile_url:
  //       'https://interbalance.org/wp-content/uploads/2021/08/flouffy-VBkIK3qj3QE-unsplash-scaled-e1631077364762.jpg',
  //     nickname: '멍뭉이2',
  //   },
  //   {
  //     email: 'bsw@naver.com',
  //     profile_url:
  //       'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG',
  //     nickname: '멍뭉이1',
  //   },
  // ];
  const userData = {
    email: userInfo.data.email.split('@')[0],
    profile_url: userInfo.data.profile_url,
    paragraph: userInfo.data.name,
  };

  return (
    <FollowArticle>
      <UserList profile={userData} />
      <TitleBox>
        <h2>회원님을 위한 추천</h2>
        <Link href='/main'>모두 보기</Link>
      </TitleBox>
      {recommendProfile.map((data: recommendUserListProps) => {
        return <FollowList profile={data} />;
      })}
    </FollowArticle>
  );
}

const renderRecommendFollow = async (key: string, value: string[]) => {
  let followerParagraph = '';
  let recommendData = {
    email: '',
    profile_url: '',
    paragraph: '',
  };

  // 0번째 팔로하는 user email 불러오기
  const userEmailRef = doc(db, 'users', value[0]);
  const userEmailSnapshot = await getDoc(userEmailRef);
  if (userEmailSnapshot.exists()) {
    const userEmailData = userEmailSnapshot.data() as User;
    const userId = userEmailData.email.split('@')[0];
    if (value.length === 1) followerParagraph = `${userId}님이 팔로우합니다`;
    else `${userId}님 외 ${value.length - 1}명이 팔로우합니다`;
  }

  // 추천 팔로잉 data 불러오기
  const recommendDataRef = doc(db, 'users', key);
  const recommendDataSnapshot = await getDoc(recommendDataRef);
  if (recommendDataSnapshot.exists()) {
    const userData = recommendDataSnapshot.data() as User;

    if (userData.email && userData.profile_url) {
      recommendData = {
        email: userData.email,
        profile_url: userData.profile_url,
        paragraph: followerParagraph,
      };
    }
  }

  return <FollowList profile={recommendData} />;
};

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
