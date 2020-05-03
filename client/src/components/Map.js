import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const mapStyles = {
    width: '100%',
    heigth: '100%',
};

export class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            venues: [
                { lat: 52.471015, lng: 12.719707 }
            ]
        }
    }

    displayMarkers = () => {
        return this.state.venues.map((venue, index) => {
          return <Marker key={index} id={index} position={{
            lat: venue.latitude,
            lng: venue.longitude
          }}
          onClick={() => console.log(this.state.venues)} />
        })
      }

      render() {
        return (
          <Map
           google={this.props.google}
           zoom={8}
           style={mapStyles}
           initialCenter={{ lat: 52.471015, lng: 12.719707 }}
          >
            {this.displayMarkers()}

          </Map>
        );
      }
    }


export default GoogleApiWrapper({
    apiKey:'AIzaSyAjVzfgQpGin9L9zRJK5dO_WIM1x9qgdHI'
  })(MapContainer);