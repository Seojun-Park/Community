import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CircleImage from "./CircleImage";
import { ArrowUp, ArrowDown } from "./Icon";

const Wrapper = styled.div`
  width: 120px;
  height: 130px;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 30% 70%;
`;

const DateBox = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
  background-color: #4cd137;
  opacity: 0.8;
  @media screen and (min-width: 769px) {
  }
`;

const DateText = styled.span`
  color: white;
  font-size: 10px;
  width: 70px;
  margin-left: 10px;
`;

const Logo = styled.div`
  background: url(${props => props.url});
  background-size: cover;
  width: 80px;
  height: 18px;
  /* margin-left: 50px; */
`;

const CurrBox = styled.div`
  padding: 5px;
  display: grid;
  grid-template-columns: 40% 60%;
  background-color: #fbc531;
  height: 90px;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ImageText = styled.span`
  padding-top: 3px;
  font-size: 14px;
  font-weight: 600;
`;

const RateBox = styled.div`
  align-items: center;
  flex-direction: column;
`;

const PastRate = styled.div`
  margin: 5px 0;
  display: flex;
  justify-content: center;
`;

const PastText = styled.span`
  font-size: 12px;
  font-weight: 400;
  padding: 5px;
`;

const TodayRate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
`;

const RateText = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-right: 10px;
`;

export default () => {
  const [exchange, setExchange] = useState({
    date: "",
    base: "",
    rates: ""
  });
  const [pExchange, setPexchange] = useState({
    date: "",
    base: "",
    rates: ""
  });
  let today = new Date();

  const getExchange = () => {
    const url = `https://api.exchangeratesapi.io/${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}`;
    const pastUrl = `https://api.exchangeratesapi.io/${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate() - 1}`;
    fetch(url)
      .then(res => res.json())
      .then(data =>
        setExchange({
          date: data.date,
          base: data.base,
          rates: trimm(JSON.stringify(data.rates))
        })
      );
    fetch(pastUrl)
      .then(res => res.json())
      .then(data =>
        setPexchange({
          date: data.date,
          base: data.base,
          rates: trimm(JSON.stringify(data.rates))
        })
      );
  };

  const trimm = data => {
    const trim = data
      .split(",")
      .sort()
      .filter(d => d.indexOf("KRW") === 1)
      .shift()
      .split(":");
    const result = trim[1];
    return result;
  };

  useEffect(() => {
    getExchange();
  }, []);

  return (
    <Wrapper>
      <Container>
        <DateBox>
          <DateText>{exchange.date}</DateText>
          <Logo url={process.env.PUBLIC_URL + `data/ECBlogo.png`} />
        </DateBox>
        <CurrBox>
          <ImageBox>
            <CircleImage
              url={
                "https://img.icons8.com/color/96/000000/euro-pound-exchange--v1.png"
              }
              size={"md"}
            />
            <ImageText>1 EUR</ImageText>
          </ImageBox>
          <RateBox>
            <PastRate>
              <PastText>어제 {pExchange.rates}</PastText>
            </PastRate>
            <TodayRate>
              <RateText>{exchange.rates}</RateText>
              {Math.sign(Number(exchange.rates) - Number(pExchange.rates)) >
              0 ? (
                <ArrowUp />
              ) : (
                <ArrowDown />
              )}
            </TodayRate>
          </RateBox>
        </CurrBox>
      </Container>
    </Wrapper>
  );
};
