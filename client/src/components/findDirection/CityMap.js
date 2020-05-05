import React, { useState, useEffect } from "react";
import { CITY_KEY } from "../../key";

export default () => {
  const [ data, setData ] = useState([]);
  const getData = () => {
    const url = `https://developer.citymapper.com/api/1/traveltime/?startcoord=51.525246%2C0.084672&endcoord=51.559098%2C0.074503&time=2014-11-06T19%3A00%3A02-0500&time_type=arrival&key=${CITY_KEY}`;
    fetch(url)
      .then(data => data.json())
      .then(json => console.log(json));
  };

  useEffect(() => {
    getData();
  })


  return <div>lala</div>;
};
