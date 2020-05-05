import React, { useState } from "react";
import ReactMapGL, { SVGOverlay } from "react-map-gl";
// import { fromJS } from 'immutable'
import { MAP_TOKEN } from "../../key";

export default () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  const redraw = ({ project }) => {
    const [cx, cy] = project([-122.4, 37.7]);
    return <circle cx={cx} cy={cy} r={4} fill="blue" />;
  };

  const goToNYC = () => {
    const viewport = { ...viewport, longitude: -74.1, latitude: 40.7 };
    setViewport(viewport);
  };

  const onViewportChange = viewport => {
    if (viewport.longitude > 0) {
      viewport.longitude = 0;
    }
    setViewport(viewport);
  };

  return (
    <>
      <button onClick={goToNYC}>NYC</button>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAP_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v10"
        onViewportChange={onViewportChange}
      >
        <SVGOverlay redraw={redraw} />
      </ReactMapGL>
    </>
  );
};
