import React from "react";
import styled from "styled-components";
import { Map } from "google-maps-react";

const Wrapper = styled.div`
  max-width: 100vw;
`;

const MapContainer = styled.div`
  position: relative;
  background-size: cover;
`;

export default () => {
  const mapStyles = {
    width: "500px",
    height: "500px"
  };
  return (
    <Wrapper>
      <MapContainer>
        <Map
          google={window.google}
          style={mapStyles}
          zoom={8}
          initialCenter={{ lat: 0, lng: 0 }}
        />
      </MapContainer>
    </Wrapper>
  );
};
