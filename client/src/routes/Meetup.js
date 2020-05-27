import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SHOW_MEET, ME } from "../SharedQueries";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import MeetupCard from "../components/MeetupCard";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
`;

const Container = styled.div`
  ${props => props.theme.containerBox}
  margin: 5% 12.5%;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LinkHeader = styled.div``;

const Content = styled.div`
  margin-bottom: 50px;
  height: 100%;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 250px;
  grid-auto-rows: 250px;

  border: 1px solid red;
`;

export default () => {
  const { data: meetData, loading } = useQuery(SHOW_MEET);
  const { data: meData } = useQuery(ME);

  return (
    <Wrapper>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <Body>
            <LinkHeader>
              <Link to="/craeteMeetUp">모임 생성</Link>
            </LinkHeader>
            <Content>
              {meetData &&
                meetData.showMeet &&
                meetData.showMeet.map(d => <MeetupCard key={d.id} data={d} />)}
            </Content>
            {meData && console.log(meData)}
          </Body>
        )}
      </Container>
    </Wrapper>
  );
};
