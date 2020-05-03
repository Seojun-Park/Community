import React, { useState, useEffect } from 'react';
import ReactMapGL, { NavigationControl, FlyToInterpolator} from 'react-map-gl'
import styled from 'styled-components'
import 'mapbox-gl/dist/mapbox-gl.css';

const Wrapper = styled.div`

`;

const StyledMap = styled(ReactMapGL)`
      max-height: 500px;
      max-width: 500px;
      background-size: cover;
`;

const NaviControl = styled.div`
      position: absolute;
`;

const MAP_TOKEN = 'pk.eyJ1IjoiamlucGFyazEyMyIsImEiOiJjazlyZ2xvODYwdTI1M21ydGtpOGs5N2lhIn0.Lcyu5KuC3pd0dzXlIJ-LSw'

export default (props) => {

  const data = props.data;
  console.log(data);
  const [ viewport, setViewport ] = useState({
    latitude :53.347614,
    longitude : -6.259293,
    width: '100vw',
    height:'100vh',
    zoom: 12
  });

  return (
    <Wrapper>
      <StyledMap
        {...viewport}
        mapboxApiAccessToken={MAP_TOKEN}
        transitionDuration={400}
        transitionInterpolator={new FlyToInterpolator()}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}>
          <NaviControl>
            <NavigationControl />
          </NaviControl>
        </StyledMap>
    </Wrapper>
  )
}