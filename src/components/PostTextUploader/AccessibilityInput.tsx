import { PostUploaderState, setCreateAt, setPost, setPostImages, setUserUid } from "@/redux/postImageUploader";
import acordianUpIcon from "../../public/icons/Acordian/acordianUpIcon.png";
import { ImageObj } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { PostUploadModalState, close } from "@/redux/postUploadModal";
import { useDispatch } from "react-redux";
import { getData, pushData, pushFile } from "@/firebase/utils";
import { getDownloadURL } from "firebase/storage";
import { userWriteRef } from "@/firebase/app";

interface AccessibilityInputProps {}

interface state {
  postUploaderSlice: PostUploaderState;
  postUploadModalSlice: PostUploadModalState;
  userUid: { value: string };
}

// const acordianDownIcon =

const AccessibilityInput: React.FC<AccessibilityInputProps> = () => {
  const dispatch = useDispatch();
  const [isAcordianOpened, setIsAcordianOpened] = useState(false);
  const imageList = useSelector(({ postUploaderSlice }: state) => {
    return postUploaderSlice?.imageList;
  });

  const currentPost = useSelector(({ postUploaderSlice }: state) => {
    return postUploaderSlice?.post;
  });
  const getImageUrl = (e: File) => {
    return URL.createObjectURL(e);
  };

  const [imagesObjList, setImagesObjList] = useState<ImageObj[]>([]);
  useEffect(() => {
    imageList?.map((elem, i) => {
      let temp = imagesObjList;
      temp.push({ src: getImageUrl(elem), alt: "" });
      setImagesObjList(temp);
    });
  }, []);

  const isContentEnded = useSelector(({ postUploadModalSlice: state }: state) => {
    return state.isEnded;
  });

  const userUid = useSelector((state: state) => state.userUid.value);
  useEffect(() => {
    if (isContentEnded) {
      (async () => {
        try {
          const imagePromises = imageList.map(async (e, i) => {
            const snapshot = await pushFile(e, "postimages", "wonjunTest" + `${imagesObjList[i].alt}`);
            const downloadURL = await getDownloadURL(snapshot.ref);
            // 다운로드 URL을 가져오기
            let temp = imagesObjList;
            temp[i].src = downloadURL;
            // temp[i] = { ...temp[i], src: downloadURL }; // src 속성 수정

            return temp;
          });

          const updatedImages = await Promise.all(imagePromises);
          const finalImages = updatedImages.reduce((acc, curr) => {
            if (curr) {
              acc = curr;
            }
            return acc;
          }, []);

          setImagesObjList(finalImages);

          // dispatch(setPostImages(finalImages));
          // dispatch(setCreateAt(new Date().toISOString()));
          // dispatch(setUserUid(userUid));
          let now = new Date().toISOString();
          const updatedPost = { ...currentPost, images: finalImages, user_uid: userUid, createAt: now };
          console.log("updatedPost", updatedPost);

          dispatch(setPost(updatedPost));
          await userWriteRef.doc().set(updatedPost);

          dispatch(close());
        } catch (error) {
          console.error("Error updating currentPost:", error);
        }
      })();
    }
  }, [isContentEnded]);

  return (
    <AccessibilityInputWrapper>
      <AccordianHeader>
        <span className="headerName">접근성</span>
        <button
          type="button"
          onClick={() => {
            setIsAcordianOpened(!isAcordianOpened);
          }}
        >
          {isAcordianOpened ? (
            <Image src={acordianUpIcon} alt="아코디언 접기버튼"></Image>
          ) : (
            <Image
              style={{
                transform: "rotate(180deg)",
              }}
              src={acordianUpIcon}
              alt="아코디언 펼치기버튼"
            ></Image>
          )}
        </button>
      </AccordianHeader>
      {isAcordianOpened ? (
        <ContentWrapper>
          <AboutAccessibility>
            대체 텍스트는 시각적으로 사진을 보기 어려운 사람들에게 사진 내용을 설명하는 텍스트입니다. 대체 텍스트는 회원님의 사진에 대해 자동으로
            생성되며, 직접 입력 할 수도 있습니다.
          </AboutAccessibility>
          {imageList?.map((imageItem, index) => {
            // console.log("imageItem", imageItem);
            // console.log("imageItem", getImageUrl(imageItem));

            return (
              <ListContent key={index} className="image-accordion-item">
                <img src={getImageUrl(imageItem)} alt={`${index + 1}번째 이미지`} />
                <input
                  key={index}
                  type="text"
                  placeholder="대체 텍스트를 입력해주세요"
                  onChange={(e) => {
                    const temp = imagesObjList;
                    temp[index].alt = e.target.value;
                    setImagesObjList(temp);
                    // console.log(imagesObjList);
                  }}
                />
              </ListContent>
            );
          })}
        </ContentWrapper>
      ) : null}
    </AccessibilityInputWrapper>
  );
};

const AccessibilityInputWrapper = styled.div`
  background: #ffffff;
  width: 407px;
  border-top: 1px solid #dbdbdb;
`;

const AccordianHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 12px;

  height: 54.93px;

  > span.headerName {
    /* width: 56px; */
    height: 24px;
    font-family: "Inter";
    font-style: normal;
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

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-evenly;
  width: 407px;
  gap: 18px;
`;

const AboutAccessibility = styled.span`
  display: flex;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  padding: 0px 11px;
  gap: 10px;

  height: 51px;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const ListContent = styled.div`
  display: flex;
  width: 100%;
  height: 62px;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 15px;

  width: 407px;
  height: 62px;
  > img {
    width: 62px;
    height: 62px;
  }
  > input {
    width: 300px;
    height: 62px;
  }
`;

export default AccessibilityInput;
