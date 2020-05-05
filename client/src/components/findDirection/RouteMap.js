import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import styled from "styled-components";
import { GOOGLE_KEY, MAP_TOKEN } from "../../key";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import MapboxGeocoder from "mapbox-gl-geocoder";
import { customData } from "./dummy";

mapboxgl.accessToken = MAP_TOKEN;

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Container = styled.div`
  position: absolute;
  min-height: 50vh;
`;

export default class RouteMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -6.259293,
      lat: 53.347614,
      zoom: 12
    };

  }

  getRouteData = (e) => {
    const url = `json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=${GOOGLE_KEY}`;
    fetch(url)
      .then(data => data.json())
      .then(json => console.log(json));
  };

  componentDidMount() {
    function forwardGeocoder(query) {
      var matchingFeatures = [];
      for (var i = 0; i < customData.features.length; i++) {
        var feature = customData.features[i];
        // handle queries with different capitalization than the source data by calling toLowerCase()
        if (
          feature.properties.title.toLowerCase().search(query.toLowerCase()) !==
          -1
        ) {
          // add a tree emoji as a prefix for custom data results
          // using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
          feature["place_name"] = "🌲 " + feature.properties.title;
          feature["center"] = feature.geometry.coordinates;
          feature["place_type"] = ["park"];
          matchingFeatures.push(feature);
        }
      }
      return matchingFeatures;
    }

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
      placeholderDestination: "Choose Destination"
      // geocoder:     map.addControl(
      //   new MapboxGeocoder({
      //   accessToken: mapboxgl.accessToken,
      //   localGeocoder: forwardGeocoder,
      //   zoom: 14,
      //   placeholder: 'Enter search e.g. Lincoln Park',
      //   mapboxgl: mapboxgl
      //   }))
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
        <button style={{ padding: "50px" }} onClick={this.getRouteData}>
          test :D
        </button>
        <Container
          ref={el => (this.mapContainer = el)}
          className="mapContainer"
        />
      </Wrapper>
    );
  }
}
