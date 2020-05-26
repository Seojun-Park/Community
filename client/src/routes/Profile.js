import React from "react";
import styled from "styled-components";
import { ME } from "../SharedQueries";
import { useQuery } from "@apollo/react-hooks";
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

const SubContent = styled.div``;

const Note = styled.div``;

const CreateAt = styled.div``;

const Market = styled.div`
  padding: 10px;

  border: 1px solid pink;
`;

const Rent = styled.div`
  padding: 10px;

  border: 1px solid lime;
`;

export default () => {
  const { data, loading } = useQuery(ME);
  let length;
  let slicedData;

  console.log(data);

  return (
    <Wrapper>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <Content>
            <Head>
              <AvatarPart>
                <Avatar url={data.me.avatar} size="lg" />
              </AvatarPart>
              <InfoSection>
                <Username>{data.me.username}</Username>
                <Name>
                  {data.me.firstName} {data.me.lastName}
                </Name>
                <Intro>{data.me.intro}</Intro>
              </InfoSection>
            </Head>
            <Body>
              <History>
                <Board>
                  {data.me.boards.length !== 0
                    ? data.me.boards &&
                      (slicedData = data.me.boards.slice(
                        data.me.boards.length - 5,
                        data.me.boards.length
                      )) &&
                      slicedData.map(b => {
                        const trimmedDate = b.creatdAt.slice(5, 10);
                        console.log(trimmedDate);
                        return (
                          <SubContent key={b.id}>
                            <Note>
                              {b.title} : {b.caption}
                            </Note>
                            <CreateAt>{b.createdAt}</CreateAt>
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
                        const trimmedDate = b.creatdAt.slice(5, 10);
                        console.log(trimmedDate);
                        return (
                          <SubContent key={b.id}>
                            <Note key={b.id}>
                              {b.title} : {b.caption}
                            </Note>
                            <CreateAt>{b.createdAt}</CreateAt>
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
                        const trimmedDate = b.creatdAt.slice(5, 10);
                        console.log(trimmedDate);
                        return (
                          <SubContent key={b.id}>
                            <Note key={b.id}>
                              {b.title} : {b.caption}
                            </Note>
                            <CreateAt>{b.createdAt}</CreateAt>
                          </SubContent>
                        );
                      })
                    : "No data"}
                </Rent>
              </History>
            </Body>
          </Content>
        )}
      </Container>
    </Wrapper>
  );
};
