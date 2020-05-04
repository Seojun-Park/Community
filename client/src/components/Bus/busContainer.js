import React, { useEffect, useState } from "react";
import { GOOGLE_KEY, MAP_TOKEN } from "../../key";
import styled from "styled-components";
import ReactMapGL, {
  NavigationControl,
  FlyToInterpolator,
  Marker,
  Popup
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import _ from "lodash";
// import Map from "./busMap";

const Wrapper = styled.div`
  height: 100vh;
`;

const StyledMap = styled(ReactMapGL)`
  /* max-height: 500px;
      max-width: 500px; */
  background-size: cover;
`;

// const url = `cgi-bin/rtpi/busstopinformation?stopid&stopname&format=json`;
const testUrl = `json?origin=Disneyland&destination=Universal+Studios+Hollywood&mode=transit&departure_time=now&key=${GOOGLE_KEY}`;

// const mode = ["transit"];
// const departure_time = ["now"];

export default () => {
  const [busData, setBusData] = useState([]);
  // const [finalData, setFinalData] = useState({
  //   address: "",
  //   lat: 0,
  //   lng: 0,
  //   route: {},
  //   stopId: {}
  // });

  const [viewport, setViewport] = useState({
    latitude: 53.347614,
    longitude: -6.259293,
    width: "30vw",
    height: "60vh",
    zoom: 12
  });
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [selectedStation, setSelectedStation] = useState(null);

  const callApi = async () => {
    await fetch(testUrl)
      .then(data => data.json())
      .then(json => setBusData(json));
    // .catch(e => {
    //   console.log(e);
    // });
  };

  useEffect(() => {
    callApi();
    const mapResizeEvent = _.throttle(() => {
      setViewport(
        Object.assign(
          {},
          {
            ...viewport,
            width: `${window.innerWidth}px`,
            height: `${window.innerHeight}px`
          }
        )
      );
    }, 2000);
    window.addEventListener("resize", mapResizeEvent);

    return () => {
      window.removeEventListener("resize", mapResizeEvent);
    };
  }, [viewport]);

  console.log(busData);

  return (
    <Wrapper>
      <StyledMap
        {...viewport}
        mapboxApiAccessToken={MAP_TOKEN}
        transitionDuration={400}
        transitionInterpolator={new FlyToInterpolator()}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewStateChange={viewport => {
          setViewport(viewport);
        }}
      ></StyledMap>
    </Wrapper>
  );
};
