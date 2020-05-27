import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div``;

const Container = styled.div`
  height: 100%;
  border: 1px solid blue;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Head = styled.div`
  text-align: center;
  margin: 8px;
`;
const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const Background = styled.div`
  height: 150px;
  width: 100%;
  background-size: cover;
  background-image: url(${props => props.url});
  border: 1px solid green;
`;

const Body = styled.div`
  margin: 10px;
`;

const Intro = styled.span``;

export default ({ data }) => {
  // console.log(data);

  const studyBgUrl =
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
  const workoutBgUrl =
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
  const travelBgUrl =
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1008&q=80";

  return (
    <Wrapper>
      <Container>
        <Card>
          <Head>
            <Title>
              <Link to={`/meetupDetail/${data.id}`}>{data.title}</Link>
            </Title>
          </Head>
          {data.tag === "travel" && <Background url={travelBgUrl} />}
          {data.tag === "study" && <Background url={studyBgUrl} />}
          {data.tag === "workout" && <Background url={workoutBgUrl} />}
          <Body>
            <Intro>{data.intro}</Intro>
          </Body>
          {data.tag === "travel" && <span role="img" aria-labelledby="plane"># 여행 ✈️ </span>}
          {data.tag === "study" && <span role="img" aria-label="books"># 공부 📚 </span>}
          {data.tag === "workout" && <span role="img" aria-label="gym"># 운동 💪🏻 </span>}
        </Card>
      </Container>
    </Wrapper>
  );
};
