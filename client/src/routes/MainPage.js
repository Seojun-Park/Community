import React, { useContext } from "react";
import styled from "styled-components";

import CurrencyBox from "../components/CurrencyBox";
import { AppContext } from "../components/App";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
  margin-top: 20px;
  @media screen and (min-width: 769px) {
  }
`;

const Container = styled.div`
  ${props => props.theme.containerBox}
  /* margin: 0 12.5%; */
  @media screen and (min-width: 769px) {
  }
`;

const View = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 70% 30%;
  @media screen and (min-width: 769px) {
    display: grid;
    grid-template-columns: 20% 60% 20%;
  }
`;

const ViewCol = styled.div`
  height: 100%;
  border: 1px solid black;
  &:first-child {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  &:last-child {
  }
`;

const LastViewRow = styled.div``;

export default () => {
  const isLoggedIn = useContext(AppContext);

  return (
    <Wrapper>
      <Container>
        main page
        <View>
          <ViewCol>공지사항 미니 박스</ViewCol>
          <ViewCol>대사관 뉴스를 넣어보자</ViewCol>
          <ViewCol>
            <LastViewRow>
              <CurrencyBox />
            </LastViewRow>
          </ViewCol>
        </View>
      </Container>
    </Wrapper>
  );
};
