import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ME } from "../SharedQueries";
import { useQuery } from "@apollo/react-hooks";
import { Settings } from "../components/Icon";
import Loader from "../components/Loader";
import Avatar from "../components/Avatar";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
`;

const Container = styled.div`
  ${props => props.theme.containerBox}
`;

const Content = styled.div`
  margin: 2% 12.5%;
  border: 1px solid red;
`;

const Head = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5% 0%;
`;

const InfoSection = styled.div`
  margin-left: 20%;
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AvatarPart = styled.div`
  margin-left: 30px;
`;

const Username = styled.span`
  padding: 5px;
  font-size: 20px;
  width: 150px;
`;

const Name = styled.span`
  padding: 5px;
  font-size: 18px;
`;

const Intro = styled.span`
  padding: 5px;
  font-size: 16px;
  width: 100%;
`;

const Body = styled.div`
  border: 1px solid blue;
  margin-top: 10px;
`;

const History = styled.div``;

const Board = styled.div`
  padding: 10px;

  border: 1px solid orange;
`;

const SubContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Note = styled.div`
  padding: 3px;
  margin-left: 4%;
  :hover {
    color: coral;
    transition: 0.1s linear;
  }
`;

const CreateAt = styled.div`
  margin-right: 4%;
`;

const Market = styled.div`
  padding: 10px;

  border: 1px solid pink;
`;

const Rent = styled.div`
  padding: 10px;

  border: 1px solid lime;
`;

const Title = styled.span`
  font-size: 16px;
  width: 350px;
  margin: 3px;
  overflow: hidden;
`;

const Top = styled.div`
  display: flex;
`;

export default () => {
  const { data, loading } = useQuery(ME);

  let slicedData;

  return (
    <Wrapper>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <Content>
            <Head>
              <AvatarPart>
                {data && data.me && <Avatar url={data.me.avatar} size="lg" />}
              </AvatarPart>
              {data && data.me && (
                <InfoSection>
                  <Top>
                    <Username>{data && data.me.username}</Username>
                    <Link to="/edit">
                      <Settings />
                    </Link>
                  </Top>
                  <Name>
                    {data.me.firstName} {data.me.lastName}
                  </Name>
                  <Intro>{data.me.intro}</Intro>
                </InfoSection>
              )}
            </Head>
            <Body>
              {data && data.me && (
                <History>
                  <Board>
                    {data.me.boards.length !== 0
                      ? data.me.boards &&
                        (slicedData = data.me.boards.slice(
                          data.me.boards.length - 5,
                          data.me.boards.length
                        )) &&
                        slicedData.map(b => {
                          const trimmedDate = `${b.createdAt}`.substr(0, 10);
                          return (
                            <SubContent key={b.id}>
                              <Note>
                                <Title>{b.title}</Title>
                              </Note>
                              <CreateAt>{trimmedDate}</CreateAt>
                            </SubContent>
                          );
                        })
                      : "No data"}
                  </Board>
                  <Market>
                    {data.me.markets.length !== 0
                      ? data.me.markets &&
                        (slicedData = data.me.markets.slice(
                          data.me.markets.length - 5,
                          data.me.markets.length
                        )) &&
                        slicedData.map(b => {
                          const trimmedDate = `${b.createdAt}`.substr(0, 10);
                          return (
                            <SubContent key={b.id}>
                              <Note key={b.id}>
                                <Title>{b.title}</Title>
                              </Note>
                              <CreateAt>{trimmedDate}</CreateAt>
                            </SubContent>
                          );
                        })
                      : "No Data"}
                  </Market>
                  <Rent>
                    {data.me.rents.length !== 0
                      ? data.me.rents &&
                        (slicedData = data.me.rents.slice(
                          data.me.rents.length - 5,
                          data.me.rents.length
                        )) &&
                        slicedData.map(b => {
                          const trimmedDate = `${b.createdAt}`.substr(0, 10);
                          return (
                            <SubContent key={b.id}>
                              <Note key={b.id}>
                                <Title>{b.title}</Title>
                              </Note>
                              <CreateAt>{trimmedDate}</CreateAt>
                            </SubContent>
                          );
                        })
                      : "No data"}
                  </Rent>
                </History>
              )}
            </Body>
          </Content>
        )}
      </Container>
    </Wrapper>
  );
};
