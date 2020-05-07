import React, { useState } from "react";
import styled from "styled-components";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import { MAP_TOKEN } from "../../key";
import { MarkerIcon, BikeIcon } from "../Icon";
// import BusOption from "./busOptions";
import BusTest from "./Bustext";

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl
} from "@material-ui/core";
import Button from "../Button";

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

export default ({
  getNum,
  busStop,
  dublinBike,
  action,
  route,
  stopId,
  onChange,
  onSubmit
}) => {
  const [viewport, setViewport] = useState({
    latitude: 53.347614,
    longitude: -6.259293,
    zoom: 12
  });

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
            <GeolocateControl
              style={geolocateStyle}
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
          </ReactMapGL>
        </Col>
        <Col>
          <Row>
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
                  onChange={onChange}
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
                  onChange={onChange}
                />
              </RadioGroup>
            </FormControl>
            {console.log(action) && console.log(dublinBike)}
            {/* {action === "Bike" &&
              dublinBike &&
              dublinBike.map(bike => (
                <Marker
                  key={bike.number}
                  latitude={bike.latitude}
                  longitude={bike.longitude}
                >
                  <BikeIcon />
                </Marker>
              ))} */}
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
                getNum &&
                getNum.flag == "route" &&
                busStop && 
                busStop.map(bus => (
                  <Marker
                    key={bus.stops.stopid}
                    latitude={Number(bus.stops.latitude)}
                    longitude={Number(bus.stops.longitude)}
                  >
                    <MarkerIcon />
                  </Marker>
                )))} */}
          </Row>
          <Row>
            <Lists>
              {/* {action === "Bus" &&
                  getNum &&
                  getNum.flag === "route" &&
                  busStop &&
                  busStop.map((d, index) => (
                    <List key={index}>
                      from: {d.origin} to: {d.destination}
                    </List>
                  ))
                  }
  
                  {action === "Bus" &&
                  getNum && getNum.flag === "stop" && busStop && busStop.map((d, index) => (
                    <List key={index}>
                      Bus#: {d.route} Destination: {d.destination} OnTime: {d.duetime === "Due" ? "Due" : `${d.duetime} mins`} 
                      {console.log(d)}
                    </List>
                  ))
                } */}
            </Lists>
          </Row>
        </Col>
      </Container>
    </Wrapper>
  );
};
