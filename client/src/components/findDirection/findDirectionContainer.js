import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
// import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import styled from "styled-components";
import { MAP_TOKEN } from "../../key";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

mapboxgl.accessToken = MAP_TOKEN;

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Container = styled.div`
  position: absolute;
  min-height: 50vh;
`;

export default class findDirection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -6.259293,
      lat: 53.347614,
      zoom: 12
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    const directions = new MapboxDirections({
      accessToken: MAP_TOKEN,
      unit: "metric",
      profile: "mapbox/cycling",
      placeholderOrigin: "From",
      placeholderDestination:"Choose Destination"
    });
    map.addControl(directions);
  }

  render() {
    return (
      <Wrapper>
        <div>
          <div className="sidebarStyle">
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
            {this.state.zoom}
          </div>
        </div>
        <Container
          ref={el => (this.mapContainer = el)}
          className="mapContainer"
        />
      </Wrapper>
    );
  }
}
