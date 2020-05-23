import React from "react";
import styled, { keyframes } from "styled-components";
import { Loading } from "../components/Icon";

const rotate = keyframes`
    from{
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Container = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

export default () => {
  return (
    <Container>
      <Rotate>
        <Loading />
      </Rotate>
    </Container>
  );
};
