import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SHOW_MEET, MEET_SEARCH } from "../SharedQueries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { SearchIcon } from "../components/Icon";
import Loader from "../components/Loader";
import MeetupCard from "../components/MeetupCard";
// import Pagenation from "../components/Pagenation";
import _ from "lodash";
import useInput from "../hooks/useInput";

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

const BodyContent = styled.div``;

const LinkHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 35%;
  margin-bottom: 15px;
`;

const SearchWrapper = styled.div``;

const SearchBar = styled.input`
  padding: 8px;
  margin-right: 10px;
  width: 200px;
  border-radius: 4px;
  background-color: #f1f2f6;
  border: none;
  opacity: 0.7;
`;

const LinkWrapper = styled.div`
  padding: 10px 8px;
  margin: 10px;
  background-color: #e67e22;
  width: 100px;
  border-radius: 4px;
  text-align: center;
  a {
    color: white;
  }
`;
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
  const searchInput = useInput("");
  const [data, setData] = useState({
    pageSize: 16,
    totalCount: 1,
    currentPage: 1
  });
  const { data: searchData, loading: searchLoading } = useQuery(MEET_SEARCH, {
    skip: searchInput.value === "",
    variables: {
      term: searchInput.value
    }
  });
  const [curPage, setCurPage] = useState(1);
  const [onData, setOnData] = useState([]);

  const sliceDatabyPage = (showMeet, currentPage, pageSize) => {
    setCurPage(currentPage);
    const startIndex = (currentPage - 1) * pageSize;

    setOnData(
      _(showMeet)
        .slice(startIndex)
        .take(pageSize)
        .value()
    );
    console.log(curPage);
  };

  console.log(searchData);
  useEffect(() => {
    if (meetData && meetData.showMeet) {
      setData({
        pageSize: 16,
        totalCount: meetData.showMeet.length,
        currentPage: 1
      });
      sliceDatabyPage(meetData.showMeet, data.currentPage, data.pageSize);
    }
  }, [meetData, data.currentPage, data.pageSize]);

  console.log(searchInput.value);

  return (
    <Wrapper>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <Body>
            <BodyContent>
              <LinkHeader>
                <SearchWrapper>
                  <SearchBar
                    placeholder="Search..."
                    setValue={searchInput.value}
                    onChange={searchInput.onChange}
                  />
                  <SearchIcon />
                </SearchWrapper>
              </LinkHeader>
              <Content>
                {searchInput.value === ""
                  ? meetData &&
                    meetData.showMeet &&
                    meetData.showMeet.map(d => (
                      <MeetupCard key={d.id} data={d} />
                    ))
                  : searchData &&
                    searchData.searchMeet &&
                    searchData.searchMeet.map(d => (
                      <MeetupCard key={d.id} data={d} />
                    ))}
                {/* {meetData &&
                  meetData.showMeet &&
                  onData.map(d => <MeetupCard key={d.id} data={d} />)} */}
              </Content>
            </BodyContent>
            {/* <Pagenation data={data} onChangePage={setData} /> */}
          </Body>
        )}
      </Container>
    </Wrapper>
  );
};
