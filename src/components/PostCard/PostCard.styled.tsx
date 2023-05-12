import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

export const Article = styled.article`
  margin: 0 auto 20px auto;
  display: flex;
  flex-flow: column nowrap;
  max-width: 614px;
`;

export const HeaderSection = styled.section`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0 15px 0;

  p {
    margin-right: 8px;
  }
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

export const ProfileButton = styled.button`
  all: unset;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const ProfileId = styled.p`
  font-size: 12px;
  font-weight: 600;
`;

export const PostDate = styled.p`
  font-size: 12px;
  font-weight: 400;
`;

export const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const IconButton = styled.button`
  all: unset;
  cursor: pointer;
`;

export const MoreButton = styled.button<{ color: string }>`
  all: unset;
  cursor: pointer;
  margin-top: 9px;
  color: ${(props) => props.color};
  font-weight: 500;
`;

export const MoreCommentButton = styled.button<{ color: string }>`
  all: unset;
  cursor: pointer;
  margin: 16px 0;
  color: ${(props) => props.color};
  font-weight: 500;
`;

export const CommentSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
`;

export const CommentInput = styled.input<{ color: string }>`
  width: 100%;
  border: none;
  cursor: text;
  overflow: visible;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;

  margin-top: 16px;
  margin-bottom: 20px;
  font-size: 15px;
  color: ${(props) => props.color};
  font-weight: 500;
`;

export const IconSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const FlexRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const LikeList = styled.div`
  display: flex;
  margin-top: 16px;
  margin-bottom: 16px;
  gap: 6px;
`;

export const InitialLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const AddCommentButton = styled(IconButton)<{ color: string }>`
  white-space: nowrap;
  color: ${(props) => props.color};
  font-size: 15px;
  font-weight: 700;
`;

export const RecommentLink = styled(Link)<{ color: string }>`
  text-decoration: none;
  color: ${(props) => props.color};
`;

export const IdLink = styled.a``;
