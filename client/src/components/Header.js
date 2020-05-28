import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { AppContext } from "../components/App";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import DropDown from "./DropDown";

const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

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
    color: black;
    :hover {
      transition: 0.2s linear;
      color: coral;
    }
  }
  cursor: pointer;
  @media screen and (min-width: 769px) {
    font-size: 16px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    :hover {
      transition: 0.2s linear;
      color: coral;
    }
  }
`;

const LogInOutButton = styled.button`
  border: none;
  background-color: #fafafa;
  font-size: 14px;
  font-weight: 600;
  :hover {
    transition: 0.2s linear;
    color: coral;
  }
`;

export default () => {
  const isLoggedIn = useContext(AppContext);
  const [logoutMutation] = useMutation(LOG_OUT);

  const handleLogout = async e => {
    e.preventDefault();
    try {
      const { data } = await logoutMutation();
      if (data) {
        toast.success("you are logged out :)");
      }
    } catch (e) {
      console.log(e);
    }
  };

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
              <Link to="/notice">공지사항</Link>
            </MenuText>
          </HeaderCol>
          <HeaderCol>
            <DropDown action="first" />
          </HeaderCol>
          <HeaderCol>
            <DropDown action="second" />
          </HeaderCol>
          <HeaderCol>
            <MenuText>
              {isLoggedIn === false ? (
                <Link to="/signup">회원가입</Link>
              ) : (
                <Link to="/profile">마이페이지</Link>
              )}
            </MenuText>
          </HeaderCol>
          <HeaderCol>
            <MenuText>
              {isLoggedIn === false ? (
                <LogInOutButton>
                  <Link to="/login">로그인</Link>
                </LogInOutButton>
              ) : (
                <LogInOutButton onClick={handleLogout}>로그아웃</LogInOutButton>
              )}
            </MenuText>
          </HeaderCol>
        </HeaderRow>
      </Container>
    </Wrapper>
  );
};
