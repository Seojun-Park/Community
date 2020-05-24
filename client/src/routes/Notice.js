import React, { useEffect } from "react";
import styled from "styled-components";
import { NOTICE_DATA, ME } from "../SharedQueries";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import Boardframe from "../components/BoardFrame";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
`;

const Container = styled.div`
  ${props => props.theme.containerBox};
  border: 1px solid black;
`;

const View = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  border: 1px solid black;

  @media screen and (min-width: 769px) {
  }
`;

const Head = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const HeadTitle = styled.span`
  font-size: 18px;
  padding: 10px;
  padding-bottom: 5px;
`;

const HeadCaption = styled.span`
  font-size: 14px;
  padding: 10px;
  padding-bottom: 20px;
`;

const ViewCol = styled.div`
  border: 1px solid black;
  padding: 10px;
  &:last-child {
    margin-left: 10px;
  }
`;

const ViewRow = styled.div``;

export default () => {
  const { data, loading } = useQuery(NOTICE_DATA);
  
  // try {
  //   const {
  //     data: { me }
  //   } = useQuery(ME);
  // } catch {
  //   console.log("You need to login");
  // }

  // console.log(me);

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Head>
            <HeadTitle>This is head</HeadTitle>
            <HeadCaption>Head Caption</HeadCaption>
          </Head>
          <View>
            <ViewCol>
              <Boardframe data={data.showNotice} action="notice" />
            </ViewCol>
            <ViewCol>
              <ViewRow>list box</ViewRow>
              <ViewRow>list box</ViewRow>
            </ViewCol>
          </View>
        </Container>
      )}
    </Wrapper>
  );
};
