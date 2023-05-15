import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { useState } from 'react';
import { getColor } from '@/theme/utils';
import { useSelector } from 'react-redux';
import { userUidState, userDataState } from '@/types/index';
import { BubbleMenu } from '@/components';

import logo from '@/public/images/logo.svg';
import homeEmpty from '@/public/icons/MenuBar/home-empty.png';
import homeFill from '@/public/icons/MenuBar/home-fill.png';
import searchEmpty from '@/public/icons/MenuBar/search-empty.png';
import searchFill from '@/public/icons/MenuBar/search-fill.png';
import messageEmpty from '@/public/icons/MenuBar/message-empty.png';
import messageFill from '@/public/icons/MenuBar/message-fill.png';
import alertEmpty from '@/public/icons/MenuBar/alert-empty.png';
// import alertFill from '@/public/icons/MenuBar/alert-fill.png';
import postEmpty from '@/public/icons/MenuBar/post-empty.png';
// import postFill from '@/public/icons/MenuBar/post-fill.png';
import seeMore from '@/public/icons/MenuBar/menuBurger.png';

export function MenuBar() {
  const [isBubble, setIsBubble] = useState<boolean>(false);

  const userUid = useSelector((state: userUidState) => state.userUid.value);
  const userInfo = useSelector((state: userDataState) => {
    const { isLoading, error, data } = state.userData;
    return { isLoading, error, data };
  });

  const handleBubble = () => {
    setIsBubble(!isBubble);
  };

  return (
    <MenuContainer>
      <Logo>
        <LogoLink href='/main'>
          <Image src={logo} alt='펫스타그램'></Image>
        </LogoLink>
      </Logo>
      <h2 className='a11y-hidden'>메뉴바</h2>
      <Menu>
        <div>
          <MenuLink href='/main'>
            <MenuIcon src={homeEmpty} alt='홈'></MenuIcon>홈
          </MenuLink>
          <MenuLink as='button'>
            <MenuIcon src={searchEmpty} alt='검색'></MenuIcon>검색
          </MenuLink>
          <MenuLink href='/main'>
            <MenuIcon src={messageEmpty} alt='메세지'></MenuIcon>메세지
          </MenuLink>
          <MenuLink as='button'>
            <MenuIcon src={alertEmpty} alt='알림'></MenuIcon>알림
          </MenuLink>
          <MenuLink as='button'>
            <MenuIcon src={postEmpty} alt='만들기'></MenuIcon>만들기
          </MenuLink>
          <MenuLink href='/main'>
            <ProfileIcon
              src={userInfo.data.profile_url}
              alt='프로필'
              width={27}
              height={27}
              unoptimized
            ></ProfileIcon>
            프로필
          </MenuLink>
        </div>
        {isBubble ? <BubbleMenu /> : null}
        <SeeMoreButton as='button' onClick={handleBubble}>
          <MenuIcon src={seeMore} alt='더보기'></MenuIcon>더보기
        </SeeMoreButton>
      </Menu>
    </MenuContainer>
  );
}

const MenuContainer = styled.section`
  position: fixed;
  width: 18.229%;
  height: 100vh;
  padding: 40px 30px 24.52px 30px;
`;

const Logo = styled.h1`
  margin-bottom: 35px;
`;

const LogoLink = styled(Link)`
  display: inline-block;
`;

const Menu = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 80%;
  justify-content: space-between;
`;

const MenuLink = styled(Link)`
  all: unset;
  width: 96%;
  padding: 12px 0px 12px 15px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 8px;

  :hover {
    background-color: ${getColor('secondary color')};
  }
`;

const SeeMoreButton = styled(MenuLink)`
  margin-bottom: 0px;
`;

const MenuIcon = styled(Image)`
  width: 27px;
  height: 27px;
  margin-right: 22px;
`;

const ProfileIcon = styled(MenuIcon)`
  border-radius: 50%;
`;
