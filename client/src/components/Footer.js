import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox};
  position: relative;
  margin-top: 20px;
  border-top: 1px solid black;
  padding: 20px;
  @media screen and (min-width: 769px) {
    margin-top: 40px;
    padding: 40px;
  }
`;

const Container = styled.div`
  height: 100%;
`;

export default () => {
  return (
    <Wrapper>
      <Container>test</Container>
    </Wrapper>
  );
};
