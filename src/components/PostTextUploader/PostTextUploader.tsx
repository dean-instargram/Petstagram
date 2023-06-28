import { ChangeEvent, useEffect, useRef, useState } from "react";
import locationDetailCloseBtn from "../../public/images/locationDetailCloseBtn.png";
import styled from "styled-components";
import { ImageSwiper } from "../ImageSwiper/ImageSwiper";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { PostUploadModalState, addCurContentIndex, setNextBtnActive, setPrevBtnActive } from "@/redux/postUploadModal";
import postUploaderSlice, { PostUploaderState, pushImageFile } from "@/redux/postImageUploader";
import { PostImageUploaderImageNav } from "../PostImageUploader/PostImageUploaderImageNav";
import TextAreaWithCounter from "./TextAreaWithCounter";
import Image from "next/image";
import AccessibilityInput from "./AccessibilityInput";

interface props {
  onImageUploaded?: (imageSrc: string) => void;
}

interface state {
  postUploaderSlice: PostUploaderState;
  postUploadModalSlice: PostUploadModalState;
}

export const PostTextUploader = ({ onImageUploaded }: props) => {
  // let [imageList, setImageList] = useState<Array<File>>([]);
  let imageList = useSelector(({ postUploaderSlice }: state) => {
    console.log("state", postUploaderSlice);
    return postUploaderSlice?.imageList;
  });

  let focusedImageIndex = useSelector(({ postUploaderSlice }: state) => {
    return postUploaderSlice?.focusedImageIndex;
  });

  const dispatch = useDispatch();

  const setImageList = (arr: Array<File>) => {
    arr.forEach((elem) => {
      dispatch(pushImageFile(elem));
    });
  };

  const setNextBtnActiveHandler = (i: boolean) => {
    dispatch(setNextBtnActive(i));
  };
  const setPrevBtnActiveHandler = (i: boolean) => {
    dispatch(setPrevBtnActive(i));
  };

  const getImageUrl = (e: File) => {
    return URL.createObjectURL(e);
  };

  function renderMultifulImages() {
    let imageObjectArr = imageList.map((elem) => {
      return { src: getImageUrl(elem), alt: "" };
    });
    return <ImageSwiper images={imageObjectArr}></ImageSwiper>;
  }

  const inputRef = useRef<HTMLInputElement>(null);
  function handleLocationDetailBtn() {
    // inputRef.current?.value = ""; ?? 아래랑 무슨차이?
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  // const isContentEnded = useSelector(({ postUploadModalSlice: state }: state) => {
  //   return state.isEnded;
  // });

  // useEffect(() => {
  //   if (isContentEnded) {
  //     dispatch();
  //   }
  // }, [isContentEnded]);

  if (imageList?.length == 1) {
    return (
      <TextUploader>
        <StyledImages>
          <StyledImage src={getImageUrl(imageList[0])} />
        </StyledImages>
        <TextWrapper>
          <TextAreaWithCounter maxLength={100} rows={10} cols={50} />
          <LocationDetail>
            <input type="text" ref={inputRef} />
            <button type="button" onClick={handleLocationDetailBtn}>
              <Image src={locationDetailCloseBtn} alt="작성한 위치 지우기 버튼" />
            </button>
          </LocationDetail>
          <AccessibilityInput />
        </TextWrapper>
      </TextUploader>
    );
  } else {
    return (
      <TextUploader>
        <StyledImages>{renderMultifulImages()}</StyledImages>
        <TextWrapper>
          <TextAreaWithCounter maxLength={100} rows={10} cols={50} />
          <LocationDetail>
            <input type="text" ref={inputRef} />
            <button type="button" onClick={handleLocationDetailBtn}>
              <Image src={locationDetailCloseBtn} alt="작성한 위치 지우기 버튼" />
            </button>
          </LocationDetail>
          <AccessibilityInput />
        </TextWrapper>
      </TextUploader>
    );
  }
};

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const StyledImages = styled.div`
  width: 670px;
  height: 736px;
  > .swiper-slide-active {
    width: 100%;
    /* width: 100% !important; */
    /* height: 100% !important; */
  }
`;

const TextWrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  /* background-color: yellow; */
  height: 100%;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

const LocationDetail = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 12px;
  border-top: 1px solid #dbdbdb;

  width: 407px;
  height: 54.93px;
  > input {
    border: none;
    outline: none;
    height: 24px;
    width: 100%;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
  > button {
    margin-right: 12px;
    margin-left: 12px;
    display: flex;
    padding: 0 0;
    border: none;
    width: 24px;
    height: 24px;
    cursor: pointer;
    overflow: hidden;
    > img {
      /* position: relative; */
      background-color: #fff;
      width: 100%;
      height: 100%;
    }
  }
`;

const TextUploader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 736px;
  width: 1095px;
`;
