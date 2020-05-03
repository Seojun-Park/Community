import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import GoogleMap from "../Map/Map";

const Wrapper = styled.div`
  max-height: 100vh;
  max-width: 100vw;
`;

const BikeList = styled.div``;

export default () => {
  const [dublinBike, setDublinBike] = useState([]);

  const getData = () => {
    const apiUrl = "data/dublin.json";
    axios
      .get(apiUrl)
      .then(data => {
        setDublinBike(data.data.dublinBike);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <BikeList>
        <GoogleMap data={dublinBike} />
      </BikeList>
    </Wrapper>
  );
};
