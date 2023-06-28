import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { ImageSwiper } from "../ImageSwiper/ImageSwiper";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addCurContentIndex, setNextBtnActive, setPrevBtnActive } from "@/redux/postUploadModal";
import { PostImageUploaderImageNav } from "./PostImageUploaderImageNav";
import postUploaderSlice, { PostUploaderState, pushImageFile } from "@/redux/postImageUploader";

interface props {
  onImageUploaded?: (imageSrc: string) => void;
}

interface state {
  postUploaderSlice: PostUploaderState;
}

export const PostImageUploader = ({ onImageUploaded }: props) => {
  // let [imageList, setImageList] = useState<Array<File>>([]);
  let imageList = useSelector(({ postUploaderSlice }: state) => {
    console.log("state", postUploaderSlice);
    return postUploaderSlice?.imageList;
  });

  let focusedImageIndex = useSelector(({ postUploaderSlice }: state) => {
    console.log("state", postUploaderSlice);
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

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);

    // const file = event.dataTransfer.files[0];
    // const reader = new FileReader();
    // reader.onload = () => {
    //   setImageSrc([...imageSrc, reader.result as string]);
    //   console.log(reader.result);

    //   /**
    //    * 이미지가 성공적으로 업로드되면 호출되는 콜백 함수
    //    * 이미지 url을 string 값으로 전달함
    //    */
    //   onImageUploaded?.(reader.result as string);
    // };
    // reader.readAsDataURL(file);
  };

  const getImageUrl = (e: File) => {
    return URL.createObjectURL(e);
  };

  const handleFiles = (files: FileList) => {
    let fileList: Array<File> = [];

    if (files.length > 6) {
      alert(`이미지 개수가 초과되었습니다.업로드 된 이미지 개수 : ${files.length}개 (최대 6개)`);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];

      const format: string = `${file.name.split(".").slice(-1)}`.toUpperCase();

      if (format === "JPG" || format === "JPEG" || format === "PNG" || format === "PDF") {
        fileList = [...fileList, file];
      } else {
        alert(`이미지 포맷을 확인해주세요.업로드 된 파일 이름 ${file.name} / 포맷 ${format}`);
        return;
      }
    }

    if (fileList.length > 0) {
      // setImageList([...imageList, ...fileList]);
      setImageList(fileList);
    }

    console.log(imageList);
  };

  const onInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files != null) {
      handleFiles(e.target.files);
      setNextBtnActiveHandler(true);
      setPrevBtnActiveHandler(true);
    } else {
      setNextBtnActiveHandler(false);
      setPrevBtnActiveHandler(false);
    }
  };

  // function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setImageFile(file);
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       setImageSrc(reader.result as string);
  //     };
  //   }
  // }

  function renderMultifulImages() {
    let imageObjectArr = imageList.map((elem) => {
      return { src: getImageUrl(elem), alt: "" };
    });
    return <ImageSwiper images={imageObjectArr}></ImageSwiper>;
  }

  return (
    <UploaderContainer onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
      {imageList?.length == 1 ? (
        <>
          <Image src={getImageUrl(imageList[0])} />
          <PostImageUploaderImageNav
            onInputFile={onInputFile}
            urlList={imageList.map((elem) => {
              return getImageUrl(elem);
            })}
          />
        </>
      ) : imageList?.length > 1 ? (
        <>
          {renderMultifulImages()}
          <PostImageUploaderImageNav
            onInputFile={onInputFile}
            urlList={imageList.map((elem) => {
              return getImageUrl(elem);
            })}
          />
        </>
      ) : (
        <>
          <svg width="252" height="251" viewBox="0 0 252 251" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M90.2325 86.6992C90.2325 78.0353 97.2561 71.0117 105.92 71.0117H106.966C115.63 71.0117 122.653 78.0353 122.653 86.6992C122.653 95.3632 115.63 102.387 106.966 102.387H105.92C97.2561 102.387 90.2325 95.3632 90.2325 86.6992Z"
              fill="#FFF3CA"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M27.543 37.5014C31.4657 33.5787 36.7859 31.375 42.3334 31.375H209.667C215.214 31.375 220.534 33.5787 224.457 37.5014C228.38 41.424 230.583 46.7442 230.583 52.2917V198.708C230.583 204.256 228.38 209.576 224.457 213.499C220.534 217.421 215.214 219.625 209.667 219.625H42.3334C36.7859 219.625 31.4657 217.421 27.543 213.499C23.6204 209.576 21.4167 204.256 21.4167 198.708V52.2917C21.4167 46.7442 23.6204 41.424 27.543 37.5014ZM42.3334 179.091V198.708H139.552L81.1338 140.29L42.3334 179.091ZM110.402 139.978L88.5289 118.105C84.4447 114.021 77.8229 114.021 73.7386 118.105L42.3334 149.51V52.2917L209.667 52.2917V139.198L167.816 97.2011C165.853 95.2314 163.187 94.1245 160.406 94.125C157.625 94.1255 154.959 95.2333 152.997 97.2036L110.402 139.978ZM125.192 154.768L169.132 198.708H209.667V168.831L160.41 119.402L125.192 154.768Z"
              fill="#FFF3CA"
            />
          </svg>
          <DescriptionText>사진과 동영상을 여기에 끌어다 놓으세요</DescriptionText>
          <DirectFileInputBtn>
            컴퓨터에서 선택
            <Input type="file" multiple onChange={onInputFile} />
          </DirectFileInputBtn>
        </>
      )}
    </UploaderContainer>
  );
};

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UploaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 700px;
  width: 803px;
`;

const DescriptionText = styled.span`
  display: inline-block;
  width: 314px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  color: #333333;
  margin-bottom: 24px;
`;

const DirectFileInputBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  border: none;

  width: 150px;
  height: 30px;

  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #fff;

  /* primary color */
  background: #ffb800;
  border-radius: 5px;
  position: relative;
`;

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
