import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { BOARD_DATA } from "../../SharedQueries";
import FatText from "../components/FatText";
import Carousel from "react-bootstrap/Carousel";

// 슬라이더는 추후 더 구상해 볼것

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (min-width: 769px) {
    margin-top: 50px;
  }
`;

const TopSlider = styled.div`
  width: 150px;
  margin: 20px auto;
  @media screen and (min-width: 769px) {
    margin-top: 10px;
    width: 300px;
    height: 200px;
    background-size: cover;
    display: flex;
    margin: 30px auto;
  }
`;

const Contents = styled.div`
  background-color: #2ecc71;
  width: 250px;
  height: 200px;
  opacity: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:not(:last-child) {
      margin: 10px;
      margin: 10px auto;
  }
  @media screen and (min-width: 769px) {
    width: 935px;
  }
`;

const ContentRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  @media screen and (min-width: 769px) {
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: auto;
  padding: 3px;
  @media screen and (min-width: 769px) {
  }
`;

const Typo = styled.div`
  font-size: 5px;
  &:first-child {
      width: 40%;
      margin-top: 5px;
    }
    &:last-child {
      width: 20%;
    }

  @media screen and (min-width: 769px) {
    font-size: 12px;
    &:first-child {
      width: 60%;
    }
    &:last-child {
      width: 20%;
    }
  }
`;

export default () => {
  const { data, loading } = useQuery(BOARD_DATA);
  if (loading) {
    return <CircularProgress />;
  } else if (!loading) {
    const { showBoard } = data;

    // Descending 찾기
    let reverseData = showBoard.reverse();
    const sliceData = reverseData.slice(
      showBoard.length + 15 - showBoard.length
    );
    reverseData = sliceData.reverse();

    return (
      <Wrapper>
        <TopSlider>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1502700807168-484a3e7889d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"
                alt="First slide"
              />
              <Carousel.Caption>
                <p>add some description</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1470755148323-3b7582338b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                alt="Third slide"
              />

              <Carousel.Caption>
                <p>add some description</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1530538095376-a4936b35b5f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                alt="Third slide"
              />

              <Carousel.Caption>
                <p>add some description</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </TopSlider>
        <Contents>
          <FatText text="Notice" />
          <ContentRow>
            <Content>공지사항 요약</Content>
          </ContentRow>
        </Contents>
        <Contents>
          <FatText text="Board" />
          <ContentRow>
            {showBoard &&
              reverseData.map((b, index) => {
                const trimmedDate =
                  `${b.createdAt}`.substr(5, 5) +
                  "  " +
                  `${b.createdAt}`.substr(11,-1);
                return (
                  <Content key={index}>
                    <Typo>
                      {index} {b.title}
                    </Typo>
                    <Typo>{b.user.username}</Typo>
                    <Typo>{trimmedDate}</Typo>
                  </Content>
                );
              })}
          </ContentRow>
        </Contents>
        <Contents>
          <FatText text="Market" />
          <ContentRow>
            <Content>마켓</Content>
          </ContentRow>
        </Contents>
      </Wrapper>
    );
  }
};
