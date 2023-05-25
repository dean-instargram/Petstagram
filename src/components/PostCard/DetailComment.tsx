import * as S from './PostCard.styled';
import { Comment } from '@/components/InfiniteScroll/postList';
import { DetailCommentUnit } from '@/components/index';
import { getColor } from '@/theme/utils';
import { useState } from 'react';
import styled from 'styled-components';

interface DetailCommentProps {
  data: Comment;
  index: number;
  onClickRecomment: (index: number) => void;
}

export function DetailComment({
  data,
  index,
  onClickRecomment,
}: DetailCommentProps) {
  const [isView, setIsView] = useState<boolean>(false);

  const handleView = () => {
    setIsView(() => !isView);
  };

  return (
    <>
      <DetailCommentUnit
        data={data}
        index={index}
        onClickRecomment={onClickRecomment}
      ></DetailCommentUnit>
      <RecommentSection>
        {data.recomment.length != 0 ? (
          <S.MoreCommentButton
            color={getColor('Grey/grey-700')}
            onClick={handleView}
          >
            {isView ? (
              <span>답글 숨기기</span>
            ) : (
              <span>답글 보기 &#40;{data.recomment.length}개&#41;</span>
            )}
          </S.MoreCommentButton>
        ) : null}
        {isView
          ? data.recomment.map((recommentData) => {
              return (
                <DetailCommentUnit
                  data={recommentData}
                  index={index}
                  onClickRecomment={onClickRecomment}
                />
              );
            })
          : null}
      </RecommentSection>
    </>
  );
}

const RecommentSection = styled.div`
  margin-left: 65px;
`;
