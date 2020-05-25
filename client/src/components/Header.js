import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "../SharedQueries";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox};
  height: 15vh;
  @media screen and (min-width: 769px) {
    font-size: 14px;
    height: 25vh;
  }
`;

const Container = styled.div`
  /* ${props => props.theme.containerBox} */
  display: grid;
  height: 100%;
  grid-template-rows: 70% 30%;
  @media screen and (min-width: 769px) {
    grid-template-rows: 80% 20%;
  }
`;

const HeaderRow = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderCol = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  &:not(:last-child) {
    border-right: 1px solid black;
  }
  @media screen and (min-width: 769px) {
  }
`;

const MenuText = styled.span`
  font-size: 14px;
  font-weight: 600;
  a {
    text-decoration: none;
    :hover {
      transition: 0.2s linear;
      color: coral;
    }
  }
  cursor: pointer;
  @media screen and (min-width: 769px) {
    font-size: 16px;
  }
`;

export default ({ isLoggedIn }) => {
  console.log(isLoggedIn);
  const [option, setOption] = useState("on");
  // try {
  //   const {
  //     data: { me }
  //   } = useQuery(ME);
  //   if (me) {
  //     setOption("off");
  //   }
  // } catch {
  //   console.log("You need to login");
  // }
  return (
    <Wrapper>
      <Container>
        <HeaderRow>logo</HeaderRow>
        <HeaderRow>
          <HeaderCol>
            <MenuText>
              <Link to="/">home</Link>
            </MenuText>
          </HeaderCol>
          <HeaderCol>
            <MenuText>
              <Link to="/notice">게시판</Link>
            </MenuText>
          </HeaderCol>
          <HeaderCol>
            <MenuText>
              <Link to="/">메뉴</Link>
            </MenuText>
          </HeaderCol>
          <HeaderCol>
            <MenuText>
              <Link to="/">정보</Link>
            </MenuText>
          </HeaderCol>
          <HeaderCol>
            <MenuText>
              {isLoggedIn === false ? (
                <Link to="/login">로그인</Link>
              ) : (
                "로그아웃"
              )}
            </MenuText>
          </HeaderCol>
          <HeaderCol>
            <MenuText>
              {isLoggedIn === false && <Link to="/signup">회원가입</Link>}
            </MenuText>
          </HeaderCol>
        </HeaderRow>
      </Container>
    </Wrapper>
  );
};
