import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { NOTICE_DATA } from "../SharedQueries";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import Noticeframe from "../components/NoticeFrame";
import { AppContext } from "../components/App";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
`;

const Container = styled.div`
  ${props => props.theme.containerBox};
  border: 1px solid blue;
`;

const View = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  border: 1px solid green;
  height: 100%;
  @media screen and (min-width: 769px) {
  }
`;

const Head = styled.div`
  border: 1px solid red;
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
  border: 1px solid orange;
  padding: 10px;
  padding-top: 10px;
  width: 100%;
  height: 100%;
  &:last-child {
    margin-left: 10px;
    padding-top: 50px;
  }
`;

const ViewRow = styled.div``;

export default () => {
  const { data, loading } = useQuery(NOTICE_DATA);

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
              <Noticeframe data={data.showNotice} action="notice" />
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
