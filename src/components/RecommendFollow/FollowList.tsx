import styled from 'styled-components';
import { UserList } from '@/components';
import { getColor } from '@/theme/utils';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '@/redux/userData';
import { userUidState, userDataState } from '@/types/index';
import { Post, User } from '@/components/InfiniteScroll/postList';
import { useEffect, useState } from 'react';
import { getData, updateData } from '@/firebase/utils';

type UserProfileProps = {
  profile: {
    user_uid: string;
    email: string;
    profile_url: string;
    paragraph: string;
  };
};

export function FollowList({ profile }: UserProfileProps) {
  const dispatch = useDispatch();
  const userUid = useSelector((state: userUidState) => state.userUid.value);
  const userInfo = useSelector((state: userDataState) => {
    const { isLoading, error, data } = state.userData;
    return { isLoading, error, data };
  });

  const [isFollow, setIsFollow] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo.data.following.includes(profile.user_uid)) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  }, [userInfo]);

  const handleFollowing = async () => {
    const userResult = (await getData('users', userUid)) as User;
    if (userResult) {
      // 팔로잉
      userResult.following.push(profile.user_uid);
      updateData('users', userUid, userResult);
      dispatch(getUserData(userUid) as any);
    }

    const recommentUserResult = (await getData(
      'users',
      profile.user_uid
    )) as User;
    if (recommentUserResult) {
      // 팔로워 추가
      recommentUserResult.followers.push(userUid);
      updateData('users', profile.user_uid, recommentUserResult);
    }
  };

  return (
    <ListBox>
      <UserList
        profile={profile}
        width='30px'
        height='30px'
        fontSize='10px'
        paragraphColor={getColor('Grey/grey-600')}
      />
      {isFollow ? (
        <FollowingButton>팔로잉</FollowingButton>
      ) : (
        <FollowButton onClick={handleFollowing}>팔로우</FollowButton>
      )}
    </ListBox>
  );
}

const ListBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 279px;
  align-items: center;
  margin-bottom: 14px;
`;

const FollowButton = styled.button`
  all: unset;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  color: ${getColor('point color')};
`;

const FollowingButton = styled.button`
  all: unset;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  color: ${getColor('red/red-800')};
`;
