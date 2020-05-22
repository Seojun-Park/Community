import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CircleImage from "./CircleImage";
import { ArrowUp, ArrowDown } from "./Icon";

const Wrapper = styled.div`
  margin: 50px;
  border: 1px solid black;
`;

const Container = styled.div`
  width: 170px;
  height: 130px;
  /* justify-content: center;
  align-items: center;
  flex-direction: column; */
  display: grid;
  grid-template-rows: 15% 85%;
  border: 1px solid red;
`;

const DateBox = styled.div`
  font-size: 10px;
  margin: 0 5px;
  border: 1px solid red;

  @media screen and (min-width: 769px) {
  }
`;

const CurrBox = styled.div`
  margin: 5px;
  display: grid;
  grid-template-columns: 40% 60%;
  border: 1px solid red;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RateBox = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RateText = styled.span`
  font-size: 12px;
  font-weight: 400;
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

  console.log(Number(exchange.rates));
  console.log(Number(pExchange.rates));
  console.log(Math.sign(Number(exchange.rates) - Number(pExchange.rates)));
  return (
    <Wrapper>
      <Container>
        <DateBox>{exchange.date}</DateBox>
        <CurrBox>
          <ImageBox>
            <CircleImage
              url={
                "https://img.icons8.com/color/96/000000/euro-pound-exchange--v1.png"
              }
              size={"md"}
            />
          </ImageBox>
          <RateBox>
            <RateText>{exchange.rates}</RateText>
            {Math.sign(Number(exchange.rates) - Number(pExchange.rates)) > 0 ? <ArrowUp />: <ArrowDown />}
          </RateBox>
        </CurrBox>
      </Container>
    </Wrapper>
  );
};
