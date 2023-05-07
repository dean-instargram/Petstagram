import Link from 'next/link';
import styled from 'styled-components';

type UserListProps = {
  profile: { email: string; profile_url: string; paragraph: string };
};

export function UserList({ profile }: UserListProps) {
  const user_id = profile.email.split('@')[0];
  return (
    <ListBox>
      <ProfileButton>
        <img src={profile.profile_url} alt={profile.paragraph} />
      </ProfileButton>
      <ProfileBox>
        <LinkStyle href='/main' passHref>
          <IdLink>{user_id}</IdLink>
        </LinkStyle>
        <Name>{profile.paragraph}</Name>
      </ProfileBox>
    </ListBox>
  );
}

const ListBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

const ProfileButton = styled.button`
  all: unset;
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-right: 12px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;
  gap: 2px;
`;

const LinkStyle = styled(Link)`
  display: inline;
`;

const IdLink = styled.a`
  font-size: 10px;
  font-weight: 600;
`;

const Name = styled.p`
  width: 100%;
  font-size: 10px;
`;
