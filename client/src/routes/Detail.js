import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
`;

const Container = styled.div`
  ${props => props.theme.containerBox}
`;

export default () => {
  const action = window.location.href.split("/")[5];
  const id = window.location.href.split("/")[6];
  console.log(id);
  console.log(action);
  return (
    <Wrapper>
      <Container>lala</Container>
    </Wrapper>
  );
};
