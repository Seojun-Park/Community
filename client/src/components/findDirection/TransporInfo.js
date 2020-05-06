import React, { useState } from "react";
import styled from "styled-components";
import { useDebounce } from "../DebounceHook";
import Input from "../Input";
import Button from "../Button";

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { MAP_TOKEN } from "../../key";
import { MarkerIcon } from "../Icon";

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from "@material-ui/core";

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
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const Col = styled.div`
  &:not(:first-child) {
    display: grid;
    grid-template-rows: 1fr 2fr;
    border-left: 1px solid gray;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  &:not(:last-child) {
    padding: 20px;
    border-bottom: 1px solid gray;
  }
`;

const Lists = styled.ul``;

const List = styled.li``;

const mapRef = React.createRef();

const geolocateStyle = {
  float: "left",
  margin: "30px",
  padding: "10px"
};

export default () => {
  const [busStop, setBusStop] = useState([]);
  const [timeStamp, setTimeStamp] = useState("");
  const [viewport, setViewport] = useState({
    latitude: 53.347614,
    longitude: -6.259293,
    zoom: 12
  });
  const [curLocation, setCurLocation] = useState({});

  const setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(p => {
      let setUserLocation = {
        lat: p.coords.latitude,
        long: p.coords.longitude
      };
      let newViewPort = {
        latitude: p.coords.latitude,
        longitude: p.coords.longitude,
        zoom: 12
      };
      setCurLocation(setUserLocation);
      setViewport(newViewPort);
    });
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
        setTimeStamp(json.timestamp);
      });
  };

  useDebounce(getAPI, 3000);

  console.log(busStop);
  return (
    <Wrapper>
      <Container>
        <Col>
          <ReactMapGL
            ref={mapRef}
            {...viewport}
            width="100%"
            height="100%"
            onViewportChange={viewport => setViewport(viewport)}
            mapStyle="mapbox://styles/mapbox/light-v10"
            mapboxApiAccessToken={MAP_TOKEN}
          >
            {/* {busStop &&
              busStop.map(d => {
                return (
                  <Marker
                    key={d.stopid}
                    latitude={Number(d.latitude)}
                    longitude={Number(d.longitude)}
                  >
                    <MarkerIcon />
                  </Marker>
                );
              })} */}
            <GeolocateControl
              style={geolocateStyle}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
          </ReactMapGL>
        </Col>
        <Col>
          <Row>
            <div>{timeStamp}</div>
            <form>
              <Input placeholder="text" />
              <Button text="search" />
            </form>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="bus"
              >
                <FormControlLabel
                  value="bus"
                  control={<Radio color="primary" />}
                  label="Bus"
                  labelPlacement="bus"
                />
                <FormControlLabel
                  value="luas"
                  control={<Radio color="primary" />}
                  label="Luas"
                  labelPlacement="luas"
                />
                <FormControlLabel
                  value="bike"
                  control={<Radio color="primary" />}
                  label="Bike"
                  labelPlacement="bike"
                />
              </RadioGroup>
            </FormControl>
          </Row>
          <Row>
            <Lists>
              <List></List>
            </Lists>
          </Row>
        </Col>
      </Container>
    </Wrapper>
  );
};
