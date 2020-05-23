import React from "react";
import styled from "styled-components";
import { NOTICE_DATA } from "../SharedQueries";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../components/Loader";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
`;

const Container = styled.div`
  ${props => props.theme.containerBox};
  margin: 30px 12.5%;
  border: 1px solid black;
`;

export default () => {
  const { data, loading } = useQuery(NOTICE_DATA);
  console.log(data);
  return (
    <Wrapper>{loading ? <Loader /> : <Container>test</Container>}</Wrapper>
  );
};
