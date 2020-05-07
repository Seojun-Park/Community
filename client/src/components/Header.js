import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { SearchIcon } from "../components/Icon";

const Wrapper = styled.header`
  @media screen and (max-width: 768px) {
    width: 100%;
    border: 0;
    margin-bottom: 20px;
    background-color: #1abc9c;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    justify-content: center;
  }

  @media screen and (min-width: 769px) {
    width: 100%;
    border: 0;
    background-color: #ecf0f1;
    margin-bottom: 50px;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    justify-content: center;
    padding: 25px 0px;
    padding-bottom: 10px;
    z-index: 2;
  }
`;

const Header = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  @media screen and (min-width: 769px) {
    width: 100%;
    max-width: 1100px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

const HeaderRow = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
    text-align: center;
    &:first-child {
      margin: 0 auto;
      padding: 50px;
      overflow: hidden;
    }
    &:last-child {
      display: flex;
      flex-direction: row;
      border-top: 2px solid #2c3e50;
      padding-top: 10px;
      justify-content: space-between;
      padding-left: 15px;
    }
  }
  @media screen and (min-width: 769px) {
    width: 1100px;
    text-align: center;
    &:first-child {
      margin: 0 auto;
      padding: 50px;
      overflow: hidden;
    }
    &:last-child {
      display: flex;
      flex-direction: row;
      border-top: 2px solid #2c3e50;
      padding-top: 10px;
      justify-content: space-between;
      padding-left: 15px;
    }
  }
`;

const HeaderCol = styled.div`
  display: flex;
  &:last-child {
    display: flex;
    justify-content: space-around;
    align-content: center;
  }
`;

const MenuBlock = styled.div`
  @media screen and (max-width: 768px) {
    background-color: #2ecc71;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    padding: 5px;
    font-size: 10px;
    margin-bottom: 5px;
    &:not(:last-child) {
      margin-right: 5px;
    }
    a {
      color: #ecf0f1;
      font-weight: 400;
      text-decoration: none;
    }
    &:hover {
      background-color: #16a085;
      transition: 0.2s linear;
    }
  }
  @media screen and (min-width: 769px) {
    background-color: #2ecc71;
    width: 90px;
    padding: 10px;
    &:not(:last-child) {
      margin-right: 15px;
    }
    a {
      color: #ecf0f1;
      font-weight: 400;
      text-decoration: none;
    }
    &:hover {
      background-color: #16a085;
      transition: 0.2s linear;
    }
  }
`;

const SearchInput = styled(Input)`
  @media screen and (max-width: 768px) {
    display: none;
  }
  @media screen and (min-width: 769px) {
    padding: 5px;
    font-size: 14px;
    height: auto;
    border-radius: 3px;
    text-align: center;
    width: 120%;
    overflow: hidden;
    &::placeholder {
      opacity: 0.8;
      font-weight: 200;
    }
    margin-right: 8px;
  }
`;

export default () => {
  return (
    <Wrapper>
      <Header>
        <HeaderRow>logo here</HeaderRow>
        <HeaderRow>
          <HeaderCol>
            <MenuBlock>
              <Link to="/">Home</Link>
            </MenuBlock>
            <MenuBlock>
              <Link to="/notice">공지사항</Link>
            </MenuBlock>
            <MenuBlock>
              <Link to="/">뉴스</Link>
            </MenuBlock>
            <MenuBlock>
              <Link to="/market">벼룩시장</Link>
            </MenuBlock>
            <MenuBlock>
              <Link to="/board">자유게시판</Link>
            </MenuBlock>
            <MenuBlock>
              <Link to="/direction">경로찾기</Link>
            </MenuBlock>
          </HeaderCol>
          <HeaderCol>
            <SearchInput placeholder="Search" />
            {/* <Link to="/">
              <SearchIcon size="30" />
            </Link> */}
          </HeaderCol>
        </HeaderRow>
      </Header>
    </Wrapper>
  );
};
