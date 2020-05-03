import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import Map from '../Map';

const BikeList = styled.div`
    min-height: 100vh;
    display: flex;
`;

export default () => {
    const [ dublinBike, setDublinBike ] = useState([]);
    // const [ number, setNumber ] = useState(0);
    // const [ name, setName ] = useState("");
    // const [ address, setAddress ] = useState("");
    // const [ lat, setLat ] = useState(0);
    // const [ lng, setLng ] = useState(0);

    
    const getData = () => {
        const apiUrl = 'data/dublin.json';
        console.log(apiUrl)
        
        axios.get(apiUrl).then (data => {
            setDublinBike(data.data.dublinBike);
        }).catch(e => {
            console.log(e);
        })
    };
    
    useEffect(()=>{
        getData()
    }, []);

    return (
        <>
            <BikeList>
                <Map />
                {/* {!dublinBike ? "nothing" : dublinBike.map(d => (
                    <div key={d.number}>
                        {d.name} {d.address} {d.latitude} {d.longitude}
                    </div>
                ))} */}
            </BikeList>
            
        </>
    )
}
