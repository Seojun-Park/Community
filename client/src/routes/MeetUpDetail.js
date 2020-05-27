import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { SEE_MEET_DETAIL, ME, DELETE_MEET } from "../SharedQueries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loader from "../components/Loader";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox}
`;

const Container = styled.div`
  ${props => props.theme.containerBox}
`;

const Box = styled.div`
  margin: 5% 12.5%;

  border: 1px solid black;
`;

const Head = styled.div`
  border: 1px solid red;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5% 10%;
  padding-right: 15%;
`;

const Buttons = styled.div``;

const Button = styled.button`
  padding: 8px;
  border: none;
  background-color: #eccc68;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 400;
  :active {
    background-color: #ffa502;
  }
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const Body = styled.div`
  border: 1px solid green;
  margin: 5% 10%;
`;

const Intro = styled.div`
  border: 1px solid orange;
  padding: 3% 0%;
`;

const Content = styled.div`
  border: 1px solid blue;
  padding: 3% 0%;
`;

const Tag = styled.div`
  margin: 2% 10%;
  padding: 2% 7%;
  background-color: #eccc68;
  font-size: 20px;
  font-weight: 400%;
  color: white;
`;

export default () => {
  const id = window.location.href.split("/")[5];
  const [isSelf, setIsSelf] = useState(false);
  const [flag, setFlag] = useState(false);
  const { data, loading } = useQuery(SEE_MEET_DETAIL, {
    variables: {
      id
    }
  });
  const [deleteMeetMutation] = useMutation(DELETE_MEET, {
    variables: {
      id,
      isMaster: isSelf
    }
  });

  const { data: self } = useQuery(ME);

  useEffect(() => {
    setFlag(false);
    if ((self && self.me && self.me.id) === (data && data.creator)) {
      setIsSelf(true);
    } else {
      console.log("not it's not mine");
    }
  }, [data, self]);

  const handleDelete = async e => {
    try {
      const {
        data: { deleteMeet }
      } = await deleteMeetMutation();
      if (deleteMeet) {
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsSelf(false);
      setFlag(true);
    }
  };

  console.log(isSelf);
  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Box>
            <Head>
              {console.log(data)}
              <Title>{data.seeMeetDetail.title}</Title>
              <Buttons>
                {isSelf === true && (
                  <Button onClick={handleDelete}>삭제</Button>
                )}
              </Buttons>
            </Head>
            <Tag># {data.seeMeetDetail.tag}</Tag>
            <Body>
              <Intro>{data.seeMeetDetail.intro}</Intro>
              <Content>
                세부계획?? 날짜 만나는거 등등 정해 구현해서 여기 넣기
              </Content>
            </Body>
          </Box>
          {flag === true && <Redirect to="/" />}
        </Container>
      )}
    </Wrapper>
  );
};
