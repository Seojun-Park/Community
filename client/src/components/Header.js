import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

export default () => {
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
              <Link to="/notice">소식</Link>
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
        </HeaderRow>
      </Container>
    </Wrapper>
  );
};
