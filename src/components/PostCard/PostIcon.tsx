import * as S from './PostCard.styled';
import { useState, useEffect } from 'react';

import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { getData, updateData } from '@/firebase/utils';
import { Post, User } from '@/components/InfiniteScroll/postList';
import { getUserData } from '@/redux/userData';

import heart from '@/public/icons/PostCard/heart.png';
import heartFill from '@/public/icons/PostCard/heart-fill.png';
import comment from '@/public/icons/PostCard/comment.png';
import send from '@/public/icons/PostCard/send.png';
import bookmark from '@/public/icons/PostCard/bookmark.png';
import bookmarkFill from '@/public/icons/PostCard/bookmark-fill.png';
import { userUidState, userDataState } from '@/types/index';

interface PostIconProps {
  postId: string;
  like: string[];
}

export function PostIcon({ postId, like }: PostIconProps) {
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const userUid = useSelector((state: userUidState) => state.userUid.value);
  const userInfo = useSelector((state: userDataState) => {
    const { isLoading, error, data } = state.userData;
    return { isLoading, error, data };
  });

  useEffect(() => {
    if (like.includes(userUid)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [like]);

  useEffect(() => {
    if (userInfo.data.scrap.includes(postId)) {
      setIsBookmark(true);
    } else {
      setIsBookmark(false);
    }
  }, [userInfo.data.scrap]);

  const handleHeart = async () => {
    const result = (await getData('posts', postId)) as Post;
    if (result) {
      if (isLike) {
        // 좋아요 삭제
        const index = like.findIndex((element) => element === userUid);
        if (index !== -1) {
          result.like.splice(index, 1);
        }
      } else {
        // 좋아요 추가
        result.like.push(userUid);
      }
      updateData('posts', postId, result);
    }
  };

  const handleBookmark = async () => {
    const result = (await getData('users', userUid)) as User;
    if (result) {
      if (isBookmark) {
        // 저장 취소
        const index = result.scrap.findIndex((element) => element === postId);
        if (index !== -1) {
          result.scrap.splice(index, 1);
        }
      } else {
        // 저장 추가
        result.scrap.push(postId);
      }
      updateData('users', userUid, result);
      dispatch(getUserData(userUid) as any);
    }
  };

  return (
    <S.IconSection>
      <S.FlexRow>
        <S.IconButton onClick={handleHeart}>
          {isLike ? (
            <Image src={heartFill} alt='좋아요' width={40} height={40}></Image>
          ) : (
            <Image src={heart} alt='좋아요' width={40} height={40}></Image>
          )}
        </S.IconButton>
        <S.IconButton>
          <Image src={comment} alt='댓글' width={40} height={40}></Image>
        </S.IconButton>
        <S.IconButton>
          <Image src={send} alt='개인메세지' width={40} height={40}></Image>
        </S.IconButton>
      </S.FlexRow>
      <S.IconButton onClick={handleBookmark}>
        {isBookmark ? (
          <Image
            src={bookmarkFill}
            alt='게시물저장'
            width={40}
            height={40}
          ></Image>
        ) : (
          <Image src={bookmark} alt='게시물저장' width={40} height={40}></Image>
        )}
      </S.IconButton>
    </S.IconSection>
  );
}
