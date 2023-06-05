import Link from "next/link";
import styled from "styled-components";
import React, { ReactNode } from "react";

interface props {
  isList: ReactNode[];
}
export default function ExtraInfoModalList({ isList }: props) {
  return (
    <Div>
      {isList.map((item) => (
        <>{item}</>
      ))}
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
    border-radius: 12px 12px 0 0;
  }
  *:last-child {
    border-radius: 0 0 12px 12px;
  }
`;
