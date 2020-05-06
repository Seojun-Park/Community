import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Input from "../Input";
import Button from "../Button";

import BusOption from "./busOptions";

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import { MAP_TOKEN } from "../../key";
import { MarkerIcon, BikeIcon } from "../Icon";
import busSorting from "./BusSorting";

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl
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

const Lists = styled.ul`
  padding: 20px;
`;

const List = styled.li``;

const mapRef = React.createRef();

const geolocateStyle = {
  float: "left",
  margin: "30px",
  padding: "10px"
};

export default () => {
  const [getNum, setGetNum] = useState({
    route: 0,
    stopid: 0
  });
  const [busStop, setBusStop] = useState([]);
  const [dublinBike, setDublinBike] = useState([]);
  const [action, setAction] = useState("none");
  const [viewport, setViewport] = useState({
    latitude: 53.347614,
    longitude: -6.259293,
    zoom: 12
  });

//   버스 api 쿼리문 만들어야함 stopid=[number] || route=[number] ...etc
  const handleOnChange = e => {
    if (e.target.value === "Bus") {
      setAction("Bus");
      //   const url = `cgi-bin/rtpi/busstopinformation?format=json`;
      //   const url = `cgi-bin/rtpi/routelistinformation? ?format=json`;
      //   fetch(url, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json"
      //     }
      //   })
      //     .then(data => data.json())
      //     .then(json => setBusStop(json.results))
    } else if (e.target.value === "Bike") {
      setAction("Bike");
      const apiUrl = "data/dublin.json";
      axios
        .get(apiUrl)
        .then(data => {
          setDublinBike(data.data.dublinBike);
        })
        .catch(e => {
          console.log(e);
        });
    } else if (e.target.value === "Luas") {
      setAction("Luas");
    } else {
      setAction("none");
    }
  };

  const handleOnSubmit = (data, flag) => {
      if (flag === "route"){
          setGetNum({
              route: data,
              stop: 0
          })
      }else if (flag === "stop"){
          setGetNum({
              route:0,
              stop: data
          })
      }
  };
  //   console.log(dublinBike);
  //   console.log(busStop);

  // if (busStop){
  //     busSorting(busStop)
  // }

  // console.log(routeStopData.data);
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
            {/* {(action === "Bike" &&
              dublinBike &&
              dublinBike.map(bike => (
                <Marker
                  key={bike.number}
                  latitude={bike.latitude}
                  longitude={bike.longitude}
                >
                  <BikeIcon />
                </Marker>
              ))) ||
              (action === "Bus" &&
                busStop &&
                busStop.map(bus => (
                  <Marker
                    key={bus.stopid}
                    latitude={Number(bus.latitude)}
                    longitude={Number(bus.longitude)}
                  >
                    <MarkerIcon />
                  </Marker>
            )))} */}
            <GeolocateControl
              style={geolocateStyle}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
          </ReactMapGL>
        </Col>
        <Col>
          <Row>
            {/* <form>
              <Input placeholder="text" />
              <Button text="search" />
            </form> */}

            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue=""
              >
                <FormControlLabel
                  value="Bus"
                  control={<Radio color="primary" />}
                  label="Bus"
                  labelPlacement="bottom"
                  onChange={handleOnChange}
                />
                <FormControlLabel
                  value="Luas"
                  control={<Radio color="primary" />}
                  label="Luas"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="Bike"
                  control={<Radio color="primary" />}
                  label="Bike"
                  labelPlacement="bottom"
                  onChange={handleOnChange}
                />
              </RadioGroup>
            </FormControl>
            {action === "Bus" && <BusOption onSubmit={handleOnSubmit} />}
          </Row>
          <Row>
            <Lists>
              <List>something will be on here</List>
            </Lists>
          </Row>
        </Col>
      </Container>
    </Wrapper>
  );
};
