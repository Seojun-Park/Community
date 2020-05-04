import React, { useState, useEffect } from 'react';
import ReactMapGL, {
  NavigationControl,
  FlyToInterpolator,
  Marker,
  Popup
} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import _ from 'lodash'
import { MarkerIcon } from '../Icon'
import styled from 'styled-components'
import { MAP_TOKEN } from '../../key'



const Wrapper = styled.div`

`;

const StyledMap = styled(ReactMapGL)`
      /* max-height: 500px;
      max-width: 500px; */
      background-size: cover;
`;

const NaviControl = styled.div`
      position: absolute;
`;

const Button = styled.button`
  background: none;
  border: none;
  :focus{
    outline: transparent;
  }
`;

// const MAP_TOKEN = 'pk.eyJ1IjoiamlucGFyazEyMyIsImEiOiJjazlyZ2xvODYwdTI1M21ydGtpOGs5N2lhIn0.Lcyu5KuC3pd0dzXlIJ-LSw'

export default (props) => {

  const data = props.data;
  console.log(data);
  const [ viewport, setViewport ] = useState({
    latitude :53.347614,
    longitude : -6.259293,
    width: '30vw',
    height:'60vh',
    zoom: 12
  });
  const [ lat, setLat ] = useState(0);
  const [ lng, setLng ] = useState(0);
  const [ selectedStation, setSelectedStation ] = useState(null);

  useEffect(() => {
    const mapResizeEvent = _.throttle(()=> {
      setViewport(Object.assign({}, {
        ...viewport,
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`
      }));
    }, 2000);
    window.addEventListener('resize', mapResizeEvent);

    return () => {
      window.removeEventListener('resize', mapResizeEvent);
    }
  }, [ viewport ]);

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
          {data && data.map((d, index) => (
            <Marker
              key={index}
              latitude={d.latitude}
              longitude={d.longitude}
              >
                <Button onClick={()=> {
                  setSelectedStation(d.address)
                  setLat(d.latitude)
                  setLng(d.longitude)
                }}
                  ><MarkerIcon /></Button>
            </Marker>
            ))
            }
            {selectedStation && (
              <Popup
                offsetLeft={10}
                latitude={lat}
                longitude={lng}
                onClose={() => {
                  setSelectedStation(null)
                  setLat(0)
                  setLng(0)
                }}
                >
                  <div>{selectedStation}</div>
              </Popup>
            )}
        </StyledMap>
    </Wrapper>
  )
}