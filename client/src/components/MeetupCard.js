import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  ${props => props.theme.wrapperBox};
`;

const Container = styled.div`
  width: 100%;
  border: 1px solid red;
`;

const Card = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Head = styled.div`
  width: 100%;
  text-align: center;
  margin: 15px;
`;
const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const Background = styled.div`
  height: 100px;
  width: 100%;

  border: 1px solid green;
`;

const Body = styled.div`
  padding-bottom: 15px;
`;

const Intro = styled.span``;

const Tag = styled.span``;

export default ({ data }) => {
  console.log(data);
  return (
    <Wrapper>
      <Container>
        <Card>
          <Head>
            <Title>{data.title}</Title>
          </Head>
          <Background>test</Background>
          <Body>
            <Intro>{data.intro}</Intro>
          </Body>
          <Tag>#{data.tag}</Tag>
        </Card>
      </Container>
    </Wrapper>
  );
};
