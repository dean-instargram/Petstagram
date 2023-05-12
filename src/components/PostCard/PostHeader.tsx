import * as S from './PostCard.styled';

import React from 'react';
import Image from 'next/image';
import { User } from '@/components/InfiniteScroll/postList';

import baseProfile from '@/public/profile.jpg';
import moreVertical from '@/public/icons/PostCard/moreVertical.png';

interface PostHeaderProps {
  props: {
    postUserData: User | undefined;
    postUserId: string | undefined;
    postDateP?: string;
  };
}

export function PostHeader({ props }: PostHeaderProps) {
  return (
    <S.HeaderSection>
      <S.StyledDiv>
        <S.ProfileButton>{renderProfile(props.postUserData)}</S.ProfileButton>
        <S.ProfileId>{props.postUserId}</S.ProfileId>
        {props.postDateP ? <S.PostDate>{props.postDateP}</S.PostDate> : null}
      </S.StyledDiv>
      <S.IconButton>
        <Image src={moreVertical} alt='더보기' width={27} height={27}></Image>
      </S.IconButton>
    </S.HeaderSection>
  );
}

const renderProfile = (postUserData: User | undefined) => {
  if (
    postUserData &&
    postUserData.profile_url &&
    postUserData.profile_url != ''
  ) {
    return (
      <S.StyledImage
        src={postUserData.profile_url}
        alt='프로필 사진'
        width={100}
        height={100}
        unoptimized
      />
    );
  }

  return (
    <S.StyledImage
      src={baseProfile}
      alt='프로필 사진'
      width={100}
      height={100}
    />
  );
};
