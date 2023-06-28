import { PostUploaderState, setContent } from "@/redux/postImageUploader";
import { PostUploadModalState } from "@/redux/postUploadModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";

interface TextAreaWithCounterProps {
  maxLength?: number;
  rows?: number;
  cols?: number;
}
interface state {
  postUploaderSlice: PostUploaderState;
  postUploadModalSlice: PostUploadModalState;
}

const TextAreaWithCounter: React.FC<TextAreaWithCounterProps> = ({ maxLength, rows = 5, cols = 50 }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    // Enter 입력을 제외한 글자 수 계산
    const adjustedValueLength = value.split("\n").join("").length;

    setText(value);
    setCharCount(adjustedValueLength);
  };

  // const isContentEnded = useSelector(({ postUploadModalSlice: state }: state) => {
  //   return state.isEnded;
  // });

  useEffect(() => {
    //Debounce 적용필요
    dispatch(setContent(text));
  }, [text]);

  return (
    <TextAreaWrapper>
      <textarea value={text} onChange={handleInputChange} maxLength={maxLength} rows={rows} cols={cols} style={{ width: "100%" }}></textarea>
      <Counter>
        <span>
          {charCount}/{maxLength !== undefined ? maxLength : "∞"}
        </span>
      </Counter>
    </TextAreaWrapper>
  );
};

export default TextAreaWithCounter;

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 12px;

  width: 407px;
  height: 218.6px;

  background: #ffffff;
  padding: 12px;
  > textArea,
  textArea:focus {
    border: none;
    outline: none;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    /* width: 387px; */
    /* height: 72px; */
  }
`;

const Counter = styled.div`
  display: flex;
  width: 378.77px;
  height: 20.59px;
  line-height: 20.59px;
  align-items: center;
  justify-content: right;
  font-size: smaller;
  > span {
    display: inline-block;
  }
`;
