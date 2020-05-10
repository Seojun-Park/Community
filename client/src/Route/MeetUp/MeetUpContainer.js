import React from "react";
import styled from "styled-components";
import Card from "./Card";
import Meetup from "./MeetupGroup";
// import ActionButton from "../../components/actionButton";

const Wrapper = styled.div`
  display: flex;
  @media screen and (min-width: 769px) {
  }
`;

const Container = styled.div`
  margin: 0 auto;
`;

export default () => {
  return (
    <Wrapper>
      <Container>
        <Meetup />
      </Container>
    </Wrapper>
  );
};
