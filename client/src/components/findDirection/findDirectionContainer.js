import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAP_TOKEN } from "../../key";
import { debounce } from "@material-ui/core";
import { MarkerIcon } from "../Icon";

const Wrapper = styled.div``;

const NaviControl = styled.div`
  position: absolute;
`;

export default () => {
  const [viewport, setViewport] = useState({
    latitude: 53.347614,
    longitude: -6.259293,
    width: "30vw",
    height: "60vh",
    zoom: 12
  });

  useEffect(() => {
    const resizeEventListener = window.addEventListener(
      "resize",
      debounce(() => {
        setViewport({
          ...viewport,
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 200)
    );
    return () => {
      window.removeEventListener("resize", resizeEventListener);
    };
  }, []);
  return (
    <Wrapper>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAP_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v10"
        onViewportChange={setViewport}
      >
        <NaviControl>
          <NavigationControl />
        </NaviControl>
        <Marker latitude={53.347614} longitude={-6.259293}>
          <MarkerIcon />
        </Marker>
      </ReactMapGL>
    </Wrapper>
  );
};
