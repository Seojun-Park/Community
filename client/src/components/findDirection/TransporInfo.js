import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 10px;
`;

const Container = styled.div`
  width: 900px;
  height: 100vh;
  margin: 0 auto;
  background-color: #f2f2f2;
`;

const Lists = styled.ul``;

const List = styled.li``;

export default () => {
  const [busStop, setBusStop] = useState([]);
  const [timeStamp, setTimeStamp] = useState("");
  let throttle_flag = false;
  const throttle = (func, delay) => {
    if (!throttle_flag) {
      func();
      throttle_flag = true;
      setTimeout(() => {
        throttle_flag = false;
      }, delay);
    }
  };

  const getAPI = () => {
    const url = `cgi-bin/rtpi/busstopinformation?format=json`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(data => data.json())
      .then(json => {
        setBusStop(json.results);
        setTimeStamp(json.timeStamp);
      });
  };

//   useEffect(() => {
//       getAPI();
//   });

  //   console.log(busStop);
  console.log(timeStamp)
  return (
    <Wrapper>
      <Container>
        <Lists>
          <List>test</List>
        </Lists>
      </Container>
    </Wrapper>
  );
};
