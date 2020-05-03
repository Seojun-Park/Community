import React, { useEffect, useState } from "react";

const url = `cgi-bin/rtpi/realtimebusinformation?stopid=184&format=json`

export default () => {
  const [busData, setBusData] = useState([]);
  const callApi = async() => {
    await fetch(url)
      .then(data => data.json())
      .then(json => setBusData(json.data))
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    callApi();
  }, []);

  console.log(busData);

  return <div>lalala</div>;
};
