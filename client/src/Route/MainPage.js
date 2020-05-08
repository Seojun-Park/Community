import React from "react";
import styled from "styled-components";
import { Container, Row } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import { BOARD_DATA } from "./SharedQueries";
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

const MContainer = styled(Container)`
  margin-top: 20px;
  background-color: #f2f2f2;
  padding: 20px;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const Contents = styled.div`
  background-color: #2ecc71;
  opacity: 0.5;
  &:not(:last-child) {
    margin: 10px;
  }
  @media screen and (min-width: 769px) {
  }
`;

const ContentRow = styled(Row)`
  display: flex;
`;

const Content = styled.div`
  display: block;
  width: 20%;
  margin: 0 auto;
  padding: 5px;
  &:first {
    width: 50%;
  }
  &:not(:first-child) {
    width: 10%;
  }
  &:not(:last-child) {
    margin-right: 30px;
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
    // const sliceData = reverseData.slice(5, 10);
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

        <FatText text="Board" />
        <MContainer fluid>
          {showBoard &&
            reverseData.map((b, index) => {
              const trimmedDate =
                `${b.createdAt}`.substr(5, 5) +
                "  " +
                `${b.createdAt}`.substr(11, 5);
              return (
                <ContentRow key={b.id}>
                  <Content>{b.title}</Content>
                  <Content>{b.user.username}</Content>
                  <Content>{trimmedDate}</Content>
                </ContentRow>
              );
            })}
        </MContainer>
        <FatText text="Market" />
        <MContainer fluid>
          <ContentRow>
            <Content>벼룩시장 요약</Content>
          </ContentRow>
        </MContainer>
        <FatText text="Immobiler" />
        <MContainer fluid>
          <ContentRow>
            <Content>내집찾기 요약</Content>
          </ContentRow>
        </MContainer>
        <MContainer fluid>
          <ContentRow>
            <Content>광고</Content>
          </ContentRow>
        </MContainer>
      </Wrapper>
    );
  }
};
