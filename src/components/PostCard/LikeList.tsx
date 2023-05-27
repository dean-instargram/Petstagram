import * as S from './PostCard.styled';
import React, { useEffect, useState, useRef } from 'react';
import { User } from '@/components/InfiniteScroll/postList';
import { getData } from '@/firebase/utils';

interface LikeListProps {
  like: string[];
}

export function LikeList({ like }: LikeListProps) {
  const [likeEmail, setLikeEmail] = useState<string[]>([]);

  const getLikeUsers = async (uid: string) => {
    const result = (await getData('users', uid)) as User;
    if (result) setLikeEmail((likeEmail) => [...likeEmail, result.email]);
  };

  useEffect(() => {
    setLikeEmail([]);
    like.map((uid: string) => {
      getLikeUsers(uid);
    });
  }, [like]);

  return (
    <S.LikeList>
      <S.InitialLink href='/main' passHref>
        <S.IdLink>{likeEmail[0] ? likeEmail[0].split('@')[0] : null}</S.IdLink>
      </S.InitialLink>
      {likeEmail.length > 1 ? (
        <p>
          님 외 <strong>{likeEmail.length - 1}</strong> 명이 좋아합니다
        </p>
      ) : (
        <p>님이 좋아합니다</p>
      )}
    </S.LikeList>
  );
}
