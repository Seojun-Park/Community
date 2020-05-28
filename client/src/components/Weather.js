import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WEATHER_KEY } from "../key";

const Container = styled.div``;

const Weather = styled.div``;

const Today = styled.div``;

const Week = styled.div``;

const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=53.3498&lon=6.2603&exclude=hourly&units=metric&lang=kr&appid=${WEATHER_KEY}`;
// const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

export default () => {
  const [curWeather, setCurWeather] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const getWeather = () => {
    setFlag(true);
    setLoading(true);
    fetch(apiUrl)
      .then(res => res.json())
      .then(json => {
        setCurWeather(json.current);
        setDailyWeather(json.daily);
      });
    //   .then(setLoading(false));
  };

  useEffect(() => {
    getWeather();
  }, []);

  console.log(curWeather);
  console.log(dailyWeather);
  console.log(loading);
  console.log(flag);
  return (
    <Container>
      <Weather>
        <Today></Today>
        <Week></Week>
      </Weather>
    </Container>
  );
};
