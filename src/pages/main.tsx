import { PostCard, RecommendFollow } from '@/components';
import InfiniteScroll from '@/components/InfiniteScroll/InfiniteScroll';
import { UploadData } from '@/components/InfiniteScroll/UploadData';
import styled from 'styled-components';

const testDatas = [
  {
    user_uid: 'NfeMMce0J7g821R7O1QAzuZo0ia2',
    content: '고기 맛있다~',
    createAt: '2022-08-26',
    images: [
      {
        src: 'https://firebasestorage.googleapis.com/v0/b/petstagram-fe291.appspot.com/o/postimages%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7(27).png?alt=media&token=b99e7277-b978-4c09-a5cb-ed4a0f9cd5b7',
        alt: '꼬치 사진',
      },
      {
        src: 'https://firebasestorage.googleapis.com/v0/b/petstagram-fe291.appspot.com/o/postimages%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7(301).png?alt=media&token=103c8226-ff3c-49d8-89f9-089918c64cae',
        alt: '꼬치 사진2',
      },
    ],
    like: ['t53il9PxSydQoY4OQyBFrG6RRfz1'],
    comment: [
      {
        user_uid: 't53il9PxSydQoY4OQyBFrG6RRfz1',
        content: '이거 맛있어요?',
        createAt: '2022-08-26',
        like: ['NfeMMce0J7g821R7O1QAzuZo0ia2'],
        recomment: [
          {
            user_uid: 'NfeMMce0J7g821R7O1QAzuZo0ia2',
            content: '존맛탱',
            createAt: '2022-08-26',
            like: [
              'NfeMMce0J7g821R7O1QAzuZo0ia2',
              't53il9PxSydQoY4OQyBFrG6RRfz1',
            ],
          },
        ],
      },
    ],
  },
  {
    user_uid: 'NfeMMce0J7g821R7O1QAzuZo0ia2',
    content: '고기 맛있다~',
    createAt: '2022-08-26',
    images: [
      {
        src: 'https://firebasestorage.googleapis.com/v0/b/petstagram-fe291.appspot.com/o/postimages%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7(27).png?alt=media&token=b99e7277-b978-4c09-a5cb-ed4a0f9cd5b7',
        alt: '꼬치 사진',
      },
      {
        src: 'https://firebasestorage.googleapis.com/v0/b/petstagram-fe291.appspot.com/o/postimages%2F%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7(301).png?alt=media&token=103c8226-ff3c-49d8-89f9-089918c64cae',
        alt: '꼬치 사진2',
      },
    ],
    like: ['t53il9PxSydQoY4OQyBFrG6RRfz1'],
    comment: [
      {
        user_uid: 't53il9PxSydQoY4OQyBFrG6RRfz1',
        content: '이거 맛있어요?',
        createAt: '2022-08-26',
        like: ['NfeMMce0J7g821R7O1QAzuZo0ia2'],
        recomment: [
          {
            user_uid: 'NfeMMce0J7g821R7O1QAzuZo0ia2',
            content: '존맛탱',
            createAt: '2022-08-26',
            like: [
              'NfeMMce0J7g821R7O1QAzuZo0ia2',
              't53il9PxSydQoY4OQyBFrG6RRfz1',
            ],
          },
        ],
      },
    ],
  },
];

export default function Main() {
  return (
    <MainContainer>
      <MenuSection>메뉴바</MenuSection>
      <PostSection>
        {/* a11y로 숨기기 */}
        <h2>게시물</h2>
        {/* {testDatas.map((data) => (
          <PostCard post={data} />
        ))} */}
        {/* 무한 스크롤 테스트 */}
        <InfiniteScroll />
        {/* <UploadData /> */}
      </PostSection>
      <RecommendFollow />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MenuSection = styled.section`
  background-color: beige;
  width: 20%;
`;

const PostSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
`;
