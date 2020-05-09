import React from "react";
import styled from "styled-components";
import Card from "./Card";
import ActionButton from '../../components/actionButton'

const Wrapper = styled.div`
  display: flex;
  @media screen and (min-width: 769px) {
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 auto;
  height: 100%;
`;

const CardWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  &:last-child {
    margin-bottom: 20px;
  }
  width: 80%;
  margin: 0 auto;
  padding: 0 1px 0 0;
  border-radius: 3px;
  background: #bbb;
  background-image: -webkit-linear-gradient(left, #777, #eee);
  background-image: -moz-linear-gradient(left, #777, #eee);
  background-image: -ms-linear-gradient(left, #777, #eee);
  background-image: -o-linear-gradient(left, #777, #eee);
`;

export default () => {
  return (
    <Wrapper>
      <Container>
        <CardWrapper>
          <Card />
        </CardWrapper>
        <CardWrapper>
          <Card />
        </CardWrapper>
        <CardWrapper>
          <Card />
        </CardWrapper>
        <CardWrapper>
          <Card />
        </CardWrapper>
      </Container>
      <ActionButton />
    </Wrapper>
  );
};
