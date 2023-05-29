import Link from "next/link";
import styled from "styled-components";

interface props {
  isFirst?: boolean;
  isLast?: boolean;
  type: "button" | "link";
  name: string;
  href?: string;
}
type StyledProps = {
  isFirst?: boolean;
  isLast?: boolean;
};
export default function ExtraInfoModal({
  isFirst,
  isLast,
  type,
  name,
  href,
}: props) {
  return (
    <>
      {type == "button" ? (
        <ExtraInfoModalButton isFirst={isFirst} isLast={isLast}>
          {name}
        </ExtraInfoModalButton>
      ) : (
        <ExtraInfoModalLink isFirst={isFirst} isLast={isLast} href={href}>
          {name}
        </ExtraInfoModalLink>
      )}
    </>
  );
}

const ExtraInfoModalButton = styled.button<StyledProps>`
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
  border-radius: ${({ isFirst, isLast }) =>
    isFirst ? "12px 12px 0 0" : isLast ? "0 0 12px 12px" : "0"};
`;
const ExtraInfoModalLink = styled.a<StyledProps>`
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
  border-radius: ${({ isFirst, isLast }) =>
    isFirst ? "12px 12px 0 0" : isLast ? "0 0 12px 12px" : "0"};
`;
