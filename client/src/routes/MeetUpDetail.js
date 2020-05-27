import React from "react";
import styled from "styled-components";
import { SEE_MEET_DETAIL } from "../SharedQueries";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../components/Loader";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
`;

const Container = styled.div`
  ${props => props.theme.containerBox}
`;

export default () => {
  const id = window.location.href.split("/")[5];
  const { data, loading } = useQuery(SEE_MEET_DETAIL, {
    variables: {
      id
    }
  });
  console.log(data);

  return (
    <Wrapper>{loading ? <Loader /> : <Container>lala</Container>}</Wrapper>
  );
};
