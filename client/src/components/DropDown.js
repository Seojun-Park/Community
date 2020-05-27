import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavbarDropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 140px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0, 2);
  padding: 12px 16px;
  z-index: 1;
  border-radius: 4px;
`;

const NavbarDropdown = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${NavbarDropdownContent} {
    display: flex;
    flex-direction: column;
    transition: 0.2s linear;
    opacity: 0.9;
  }
`;

const DropdownBox = styled.div`
  padding: 10px;
  a {
    text-decoration: none;
  }
  :hover {
    transition: 0.2s linear;
    opacity: 0.9;
    background-color: lime;
  }
`;

export default ({ action }) => {
  return (
    <NavbarDropdown>
      {action === "first" && (
        <>
          <span>메뉴</span>
          <NavbarDropdownContent>
            <DropdownBox>
              <Link to="/board">자유게시판</Link>
            </DropdownBox>
            <DropdownBox>
              <Link to="/market">벼룩시장</Link>
            </DropdownBox>
            <DropdownBox>
              <Link to="/rent">내 집 찾기</Link>
            </DropdownBox>
            <DropdownBox>
              <Link to="/meetup">모임</Link>
            </DropdownBox>
          </NavbarDropdownContent>
        </>
      )}
      {action === "second" && (
        <>
          <span>정보</span>
          <NavbarDropdownContent>
            <DropdownBox>
              <Link to="/info">유학 정보</Link>
            </DropdownBox>
          </NavbarDropdownContent>
        </>
      )}
    </NavbarDropdown>
  );
};
