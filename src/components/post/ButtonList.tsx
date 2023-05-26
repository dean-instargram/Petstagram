import styled from "styled-components";

export default function ButtonList() {
  return (
    <Div>
      <button>삭제</button>
      <button>수정</button>
      <button>좋아요 수 숨기기</button>
      <button>댓글 기능 해제</button>
      <a>게시물로 이동</a>
      <button>취소</button>
    </Div>
  );
}

const Div = styled.div`
  * {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 467px;
    height: 80px;
    background: #ffb800;
    border: 0;
    cursor: pointer;
    border-bottom: 1px solid #ffffff;
    color: #ffffff;
    font-weight: 600;
    font-size: 20px;
  }
  *:first-child {
    border-radius: 12px 12px 0px 0px;
  }
  *:last-child {
    border-radius: 0 0 12px 12px;
  }
  a {
  }
`;
