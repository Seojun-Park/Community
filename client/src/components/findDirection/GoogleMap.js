import React, { Component } from "react";
import { GOOGLE_KEY } from "../../key";

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.googleMapRef = React.createRef();
  }

  componentDidMount() {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_KEY}&libraries=places`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
      this.googleMap = this.createGoogleMap();
      this.marker = this.createMarker();
    });
  }

  createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 16,
      center: {
        lat: 53.347614,
        lng: -6.259293
      },
      disableDefaultUI: true
    });

  createMarker = () =>
    new window.google.maps.Marker({
      position: { lat: 53.347614, lng: -6.259293 },
      map: this.googleMap
    });

  render() {
    const mapStyles = {
        width: "500px",
        height: "500px"
      };
    return (
      <>
        <div
          ref={this.googleMapRef}
          id="google-map"
          style={mapStyles}
          className="card-panel white map-holder"
        ></div>
      </>
    );
  }
}
export default GoogleMap;
