import { pushTestData } from '@/firebase/utils';
import { useEffect } from 'react';

export function UploadData() {
  const datas = [
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
      content: '고기 맛있다~22222',
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
      content: '고기 맛있다~33333333333333',
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
      content: '고기 맛있다~4444444444444444444',
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
      content: '고기 맛있다~555555555555555',
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
      content: '고기 맛있다~666666666666666666666666',
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
      content: '고기 맛있다~7777777777777777777',
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
      content: '고기 맛있다~88888888888888888',
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
      content: '고기 맛있다~9999999999999999',
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

  useEffect(() => {
    datas.map((data) => {
      pushTestData('posts', data);
    });
  }, []);

  return <div>데이터 업로드 완료~</div>;
}
