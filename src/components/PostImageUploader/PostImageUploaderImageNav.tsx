import styled from "styled-components";
import smallExitBtn from "../../public/images/smallExitBtn.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { clearImageList, removeFocusedImage, removeSelectedImage } from "@/redux/postImageUploader";
import { ChangeEventHandler } from "react";
import imgAddBtnSrc from "../../public/images/imgAddBtn.png";

interface props {
  urlList?: string[];
  onInputFile: ChangeEventHandler<HTMLInputElement>;
}

export const PostImageUploaderImageNav = ({ urlList, onInputFile }: props) => {
  const dispatch = useDispatch();

  function removeBtnHandler(i: number) {
    console.log("clicked");

    dispatch(removeSelectedImage(i));
    // dispatch(clearImageList());
  }

  return (
    <>
      <ImageNav>
        <ImageWrapper>
          {urlList?.map((elem, i) => {
            return (
              <div key={i}>
                <img src={elem} alt={`${i + 1}번 째 첨부 이미지`} />
                <button
                  type="button"
                  onClick={() => {
                    removeBtnHandler(i);
                  }}
                >
                  <Image src={smallExitBtn} alt={`${i + 1}번 째 첨부 이미지 제거버튼`} />
                </button>
              </div>
            );
          })}
        </ImageWrapper>
        <AddBtnWrapper>
          <AddBtn type="button">
            <Image src={imgAddBtnSrc} alt="이미지 추가 버튼" />
            <Input type="file" multiple onChange={onInputFile} />
          </AddBtn>
        </AddBtnWrapper>
      </ImageNav>
    </>
  );
};

const Input = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  &::file-selector-button {
    display: none;
  }
`;

const ImageNav = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  min-width: 193px;
  height: 113px;
  right: 25px;
  bottom: 80.83px;

  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
`;

const ImageWrapper = styled.div`
  display: flex;
  height: 94px;
  margin: auto 17px;
  gap: 10px;

  > div {
    position: relative;
    display: flex;
    width: 94px;
    height: 94px;
    > img {
      width: 94px;
      height: 94px;
    }
    > button {
      display: flex;
      padding: 0 0;
      border: none;
      border-radius: 50%;
      right: 6.5px;
      top: 8.33px;
      position: absolute;
      width: 10px;
      height: 10px;
      cursor: pointer;
      overflow: hidden;
      > img {
        position: relative;
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const AddBtnWrapper = styled.div`
  margin: auto auto auto 0;
  display: block;
  width: 50px;
  height: 94px;
  margin-right: 18px;
`;

const AddBtn = styled.button`
  display: flex;
  padding: 0 0;
  border: none;
  width: 50px;
  height: 50px;
  overflow: hidden;

  position: relative;
  /* background-color: aqua; */
  border-radius: 50%;
`;
