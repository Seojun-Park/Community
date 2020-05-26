import React from "react";
import styled from "styled-components";
import { ME } from "../SharedQueries";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import Upload from "../components/upload";

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

const EditAvatar = styled.div``;

export default () => {
  const { data, loading } = useQuery(ME);
  console.log(data);
  return (
    <Wrapper>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <Content>
            <EditAvatar>
              <Upload data={data.me} />
            </EditAvatar>
          </Content>
        )}
      </Container>
    </Wrapper>
  );
};
