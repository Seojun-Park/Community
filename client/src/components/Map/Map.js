import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import styled from "styled-components";
import ReactMapGL, { GeolocateControl, Marker, Popup } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { MAP_TOKEN } from "../../key";
import { MarkerIcon } from "../Icon";
import axios from "axios";

const Wrapper = styled.div``;

const Content = styled.div``;

const Button = styled.button`
  background: none;
  border: none;
  :focus {
    outline: transparent;
  }
`;
export default class DirectionMap extends Component {
  state = {
    viewport: {
      latitude: 53.347614,
      longitude: -6.259293,
      zoom: 12
    },
    bikeStation: [],
    userLocation: {},
    selectedStation: {
      name: "",
      lat: 0,
      lng: 0
    }
  };

  componentDidMount() {
    this.getStationAPI();
  }

  getStationAPI = () => {
    const apiUrl = "data/dublin.json";
    axios
      .get(apiUrl)
      .then(data => {
        console.log(data.data);
        this.setState({
          bikeStation: data.data.dublinBike
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  mapRef = React.createRef();
  handleViewPortChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  };

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(p => {
      let setUserLocation = {
        lat: p.coords.latitude,
        long: p.coords.longitude
      };
      let newViewPort = {
        width: " 70vw",
        height: "100vh",
        latitude: p.coords.latitude,
        longitude: p.coords.longitude,
        zoom: 12
      };
      this.setState({
        viewport: newViewPort,
        userLocation: setUserLocation
      });
    });
  };

  loadBikeStation = () => {
    return this.state.bikeStation.map(spot => {
      return (
        <Marker
          key={spot.number}
          latitude={spot.latitude}
          longitude={spot.longitude}
        >
          <MarkerIcon />
        </Marker>
      );
    });
  };

  render() {
    return (
      <Wrapper>
        <Content>
          <button onClick={this.setUserLocation}>My location</button>
        </Content>
        <Content>
          <ReactMapGL
            ref={this.mapRef}
            {...this.state.viewport}
            width="70vw"
            height="100vh"
            onViewportChange={viewport => this.setState({ viewport })}
            mapStyle="mapbox://styles/mapbox/light-v10"
            mapboxApiAccessToken={MAP_TOKEN}
          >
            <Geocoder
              position="top-left"
              mapRef={this.mapRef}
              mapboxApiAccessToken={MAP_TOKEN}
            />
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
            {this.state.bikeStation.length !== 0 ? (
              <>
                {this.state.bikeStation.length &&
                  this.state.bikeStation.map(spot => (
                    <div key={spot.number}>
                      <Marker
                        latitude={spot.latitude}
                        longitude={spot.longitude}
                      >
                        <Button
                          onClick={() => {
                            this.setState({
                              selectedStation: {
                                lat: spot.latitude,
                                lng: spot.longitude,
                                name: spot.address
                              }
                            });
                          }}
                        >
                          <MarkerIcon />
                        </Button>
                      </Marker>
                      {this.state.selectedStation && (
                        <Popup
                          offsetLeft={10}
                          latitude={this.state.selectedStation.lat}
                          longitude={this.state.selectedStation.lng}
                          onClose={() => {
                            this.setState({
                              selectedStation: {
                                lat: 0,
                                lng: 0,
                                name: ""
                              }
                            });
                          }}
                        >
                          <div>{this.state.selectedStation.name}</div>
                        </Popup>
                      )}
                    </div>
                  ))}
              </>
            ) : (
              "nope"
            )}
          </ReactMapGL>
        </Content>
      </Wrapper>
    );
  }
}

