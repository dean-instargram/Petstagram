import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ImageSwiper } from '../ImageSwiper/ImageSwiper';
import { Post, User } from '@/components/InfiniteScroll/postList';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const images = post.images;
  // const userId = user.email.split('@')[0];

  return (
    <>
      <Article>
        <HeaderSection>
          <ProfileButton>
            <img
              src='https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg'
              alt='프로필 사진'
            />
          </ProfileButton>
          <p>사용자 아이디</p>
          <p>1일</p>
          <MoreButton>...</MoreButton>
        </HeaderSection>
        <ImageSwiper images={images} />
        <FlexRow>
          <button>좋아요</button>
          <button>댓글</button>
          <button>메세지</button>
          <button>게시물저장</button>
        </FlexRow>
        <CommentSection>
          <FlexRow>
            <Link href='/main' passHref>
              <IdLink>to06109</IdLink>
            </Link>
            {post.like.length > 1 ? (
              <p>
                님 외 <strong>{post.like.length - 1}</strong>명이 좋아합니다
              </p>
            ) : (
              <p>님이 좋아합니다</p>
            )}
          </FlexRow>
          <FlexRow>
            <Link href='/main' passHref>
              <IdLink>yesong</IdLink>
            </Link>
            <p>{post.content}</p>
          </FlexRow>
          <MoreButton>더 보기</MoreButton>
          <MoreButton>댓글 46개 모두 보기</MoreButton>
          <FlexRow>
            <Link href='/main' passHref>
              <IdLink>to06109</IdLink>
            </Link>
            <p>사이즈는 어떻게 되나요?</p>
          </FlexRow>
          <FlexRow>
            <Link href='/main' passHref>
              <IdLink>yesong</IdLink>
            </Link>
            <p>s, m, l, xl 이렇게 있습니다 고갱님!</p>
          </FlexRow>
          <input type='text' placeholder='댓글 달기...'></input>
          <button>이모티콘</button>
        </CommentSection>
      </Article>
    </>
  );
}

const Article = styled.article`
  margin: 0 auto;
  border: 1px solid black;
  display: flex;
  flex-flow: column nowrap;
  max-width: 614px;
  margin-bottom: 20px;
`;

const HeaderSection = styled.section`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const ProfileButton = styled.button`
  all: unset;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const MoreButton = styled.button`
  color: gray;
  cursor: pointer;
`;

const CommentSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
`;

const FlexRow = styled.div`
  display: flex;
`;

const IdLink = styled.a`
  font-weight: 600;
`;
