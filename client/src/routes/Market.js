import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MARKET_DATA } from "../SharedQueries";
import { useQuery } from "@apollo/react-hooks";
import Loader from "../components/Loader";
import Boardframe from "../components/BoardFrame";
import { AppContext } from "../components/App";
// import SearchBar from "../components/SearchBar";

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
  &:last-child {
    margin-left: 10px;
    padding-top: 50px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const WriteButton = styled(Link)`
  border: none;
  background-color: pink;
  color: white;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 5px;
`;

const ViewRow = styled.div``;

export default () => {
  const { data, loading } = useQuery(MARKET_DATA);
  const isLoggedIn = useContext(AppContext);
  const [search, setSearch] = useState([]);

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Head>
            <HeadTitle>벼룩시장</HeadTitle>
            <HeadCaption>Head Caption</HeadCaption>
          </Head>
          <View>
            <ViewCol>
              {/* <SearchBar
                action="market"
                onchange={setSearch}
              /> */}
              <ButtonContainer>
                {isLoggedIn === true ? (
                  <WriteButton to="/write/market">글쓰기</WriteButton>
                ) : (
                  alert("글작성을 위해 로그인을 해주세요")
                )}
              </ButtonContainer>
              {search.length !== 0 ? (
                <Boardframe data={search} action="market" />
              ) : (
                <Boardframe data={data.showMarket} action="market" />
              )}
            </ViewCol>
            <ViewCol>
              <ViewRow>
                <Link to="/board">자유게시판</Link>
              </ViewRow>
              <ViewRow>
                <Link to="/market">벼룩시장</Link>
              </ViewRow>
              <ViewRow>
                <Link to="/rent">내집찾기</Link>
              </ViewRow>
              <ViewRow>
                <Link to="/meetup">모임</Link>
              </ViewRow>
            </ViewCol>
          </View>
        </Container>
      )}
    </Wrapper>
  );
};
