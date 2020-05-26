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
`;

const Content = styled.div`
  margin: 0 12.5%;
  height: 80vh;
  display: flex;
  flex-direction: row;

  border: 1px solid red;
`;

export default () => {
  const { data: meetData, loading } = useQuery(SHOW_MEET);
  const { data: meData } = useQuery(ME);

  console.log(meetData);
  // console.log(meData);
  return (
    <Wrapper>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <Content>
            {meetData &&
              meetData.showMeet &&
              meetData.showMeet.map(d => <MeetupCard key={d.id} data={d} />)}
          </Content>
        )}
        <Link to="/craeteMeetUp">모임 생성</Link>
      </Container>
    </Wrapper>
  );
};
