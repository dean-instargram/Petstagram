import * as S from './PostCard.styled';

import React, { useEffect, useState } from 'react';
import { ImageSwiper } from '../ImageSwiper/ImageSwiper';
import { Post, User } from '@/components/InfiniteScroll/postList';
import { getData } from '@/firebase/utils';
import {
  PostHeader,
  SimpleCommentUnit,
  DetailCommentUnit,
  PostIcon,
} from '@/components/index';

import imoge from '@/public/icons/PostCard/imoge.svg';
import Image from 'next/image';
import { getColor } from '@/theme/utils';
import { isCreateAtType, caculateTime } from '@/utils/mainUtil';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [postUserData, setPostUserData] = useState<User | undefined>(undefined);
  const [likeEmail, setLikeEmail] = useState<string[]>([]);
  const [postDateP, setPostDateP] = useState<string>('');
  const images = post.images;
  const postUserId = postUserData?.email.split('@')[0];

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
        <PostIcon />
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
                {/* <DetailCommentUnit data={data}></DetailCommentUnit> */}
                <SimpleCommentUnit data={data}></SimpleCommentUnit>
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
