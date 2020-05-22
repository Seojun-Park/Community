import React from "react";
import styled from "styled-components";

import CurrencyBox from "../components/CurrencyBox";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
  margin-top: 20px;
  @media screen and (min-width: 769px) {
  }
`;

const Container = styled.div`
  ${props => props.theme.containerBox}
  margin: 0 12.5%;
  @media screen and (min-width: 769px) {
  }
`;

const View = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 15% 70% 15%;
  @media screen and (min-width: 769px) {
  }
`;

const ViewCol = styled.div`
  height: 100%;
  border: 1px solid black;
`;

export default () => {
  return (
    <Wrapper>
      <Container>
        main page
        <CurrencyBox />
        <View>
          <ViewCol></ViewCol>
          <ViewCol>box2</ViewCol>
          <ViewCol>box3</ViewCol>
        </View>
      </Container>
    </Wrapper>
  );
};
