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

const DropDownTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: black;
  :hover {
    transition: 0.2s linear;
    color: coral;
  }
`;

const DropdownBox = styled.div`
  padding: 10px;
  a {
    text-decoration: none;
    color: black;
    :hover {
      color: coral;
    }
  }
  :hover {
    transition: 0.2s linear;
    opacity: 0.9;
    background-color: #ecf0f1;
  }
`;

export default ({ action }) => {
  return (
    <NavbarDropdown>
      {action === "first" && (
        <>
          <DropDownTitle>메뉴</DropDownTitle>
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
          <DropDownTitle>정보</DropDownTitle>
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
