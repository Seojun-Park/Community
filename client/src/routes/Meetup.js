import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
`;

const Container = styled.div`
  ${props => props.theme.containerBox}
`;

export default () => {
  return (
    <Wrapper>
      <Container>lala</Container>
    </Wrapper>
  );
};
