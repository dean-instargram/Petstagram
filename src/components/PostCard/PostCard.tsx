import * as S from './PostCard.styled';

import React, { useEffect, useState } from 'react';
import { ImageSwiper } from '../ImageSwiper/ImageSwiper';
import { Post, User, CreateAtType } from '@/components/InfiniteScroll/postList';
import { getData } from '@/firebase/utils';
import { PostHeader } from './PostHeader';

import baseProfile from '@/public/profile.jpg';
import heart from '@/public/icons/PostCard/heart.png';
import comment from '@/public/icons/PostCard/comment.png';
import send from '@/public/icons/PostCard/send.png';
import bookmark from '@/public/icons/PostCard/bookmark.png';
import imoge from '@/public/icons/PostCard/imoge.svg';
import Image from 'next/image';
import { getColor } from '@/theme/utils';

interface PostCardProps {
  post: Post;
}

function isCreateAtType(value: any): value is CreateAtType {
  return (
    typeof value === 'object' &&
    value !== null &&
    'seconds' in value &&
    'nanoseconds' in value
  );
}

export function PostCard({ post }: PostCardProps) {
  const [postUserData, setPostUserData] = useState<User | undefined>(undefined);
  const [likeEmail, setLikeEmail] = useState<string[]>([]);
  const [postDateP, setPostDateP] = useState<string>('');
  const images = post.images;
  const postUserId = postUserData?.email.split('@')[0];

  // post 주인의 userData 불러오기
  const getUserData = async () => {
    if (!postUserData) {
      const result = (await getData('users', post.user_uid)) as User;
      if (result) setPostUserData(result);
    }
  };

  const getLikeUsers = async (uid: string) => {
    if (!postUserData) {
      const result = (await getData('users', uid)) as User;
      if (result) setLikeEmail((likeEmail) => [...likeEmail, result.email]);
    }
  };

  const caculateTime = (date: number): string => {
    const postDate = date;
    const nowDate = Math.round(Date.now() / 1000);

    const diff = nowDate - postDate;

    const times = [
      { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
      { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
      { name: '일', milliSeconds: 60 * 60 * 24 },
      { name: '시간', milliSeconds: 60 * 60 },
      { name: '분', milliSeconds: 60 },
    ];

    for (const time of times) {
      const betweenTime = Math.floor(diff / time.milliSeconds);

      if (betweenTime > 0) {
        return `${betweenTime}${time.name}`;
      }
    }

    return '방금 전';
  };

  useEffect(() => {
    getUserData();
    post.like.map((uid) => {
      getLikeUsers(uid);
    });

    if (isCreateAtType(post.createAt)) {
      setPostDateP(caculateTime(post.createAt.seconds));
    }
  }, []);

  return (
    <>
      <S.Article>
        <PostHeader
          props={{
            postUserData,
            postUserId,
            postDateP,
          }}
        ></PostHeader>
        <ImageSwiper images={images} />
        <S.IconSection>
          <S.FlexRow>
            <S.IconButton>
              <Image src={heart} alt='좋아요' width={40} height={40}></Image>
            </S.IconButton>
            <S.IconButton>
              <Image src={comment} alt='댓글' width={40} height={40}></Image>
            </S.IconButton>
            <S.IconButton>
              <Image src={send} alt='개인메세지' width={40} height={40}></Image>
            </S.IconButton>
          </S.FlexRow>
          <S.IconButton>
            <Image
              src={bookmark}
              alt='게시물저장'
              width={40}
              height={40}
            ></Image>
          </S.IconButton>
        </S.IconSection>
        <S.CommentSection>
          <S.LikeList>
            <S.InitialLink href='/main' passHref>
              <S.IdLink>
                {likeEmail[0] ? likeEmail[0].split('@')[0] : null}
              </S.IdLink>
            </S.InitialLink>
            {likeEmail.length > 1 ? (
              <p>
                님 외 <strong>{likeEmail.length - 1}</strong> 명이 좋아합니다
              </p>
            ) : (
              <p>님이 좋아합니다</p>
            )}
          </S.LikeList>
          <S.FlexRow>
            <S.InitialLink href='/main' passHref>
              <S.IdLink>{postUserId}</S.IdLink>
            </S.InitialLink>
            <p>{post.content}</p>
          </S.FlexRow>
          <S.MoreButton color={getColor('Grey/grey-700')}>더 보기</S.MoreButton>
          <S.MoreCommentButton color={getColor('Grey/grey-700')}>
            댓글 {post.comment.length}개 모두 보기
          </S.MoreCommentButton>
          {post.comment.map((data) => {
            return (
              <>
                <S.FlexRow>
                  <S.InitialLink href='/main' passHref>
                    <S.IdLink>{data.email.split('@')[0]}</S.IdLink>
                  </S.InitialLink>
                  <p>{data.content}</p>
                </S.FlexRow>
                {data.recomment.length != 0
                  ? data.recomment.map((recomment) => {
                      return (
                        <S.FlexRow>
                          <S.InitialLink href='/main' passHref>
                            <S.IdLink>{recomment.email.split('@')[0]}</S.IdLink>
                          </S.InitialLink>
                          <S.RecommentLink
                            href='/main'
                            passHref
                            color={getColor('blue/blue-300')}
                          >
                            <S.IdLink>@{data.email.split('@')[0]}</S.IdLink>
                          </S.RecommentLink>
                          <p>{recomment.content}</p>
                        </S.FlexRow>
                      );
                    })
                  : null}
              </>
            );
          })}
          <S.FlexRow>
            <S.CommentInput
              type='text'
              placeholder='댓글 달기...'
              color={getColor('Grey/grey-700')}
            ></S.CommentInput>
            <S.AddCommentButton color={getColor('point color')}>
              게시
            </S.AddCommentButton>
            <S.IconButton>
              <Image
                src={imoge}
                alt='이모티콘'
                width={18.5}
                height={18.5}
              ></Image>
            </S.IconButton>
          </S.FlexRow>
        </S.CommentSection>
      </S.Article>
    </>
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
