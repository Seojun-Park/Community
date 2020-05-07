import React, { useState } from "react";
import axios from "axios";
import useInput from "../InputTool";
import Button from "../Button";
import TransportPresenter from "./TransportPresenter";

export default () => {
  const [getNum, setGetNum] = useState({
    route: 0,
    stopid: 0,
    flag: ""
  });
  const [busStop, setBusStop] = useState([]);
  const [dublinBike, setDublinBike] = useState([]);
  const [action, setAction] = useState("none");


  const route = useInput("");
  const stopId = useInput("");

  const handleOnChange = async e => {
    if (e.target.value === "Bus") {
        setAction("Bus");
        console.log(action);
        console.log(getNum);
    //   if (getNum && getNum.flag === "route") {
    //     const url = `cgi-bin/rtpi/routeinformation?routeid=${getNum.route}&operator=bac&format=json`;
    //     fetch(url, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json"
    //       }
    //     })
    //       .then(data => data.json())
    //       .then(json => setBusStop(json.results));
    //   } else if (getNum && getNum.flag === "stop") {
    //     const url = `cgi-bin/rtpi/realtimebusinformation?stopid=${getNum.stopid}&format=json`;
    //     fetch(url, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Accept: "application/json"
    //       }
    //     })
    //       .then(data => data.json())
    //       .then(json => setBusStop(json.results));
    //   }
    } else if (e.target.value === "Bike") {
        setAction("Bike");
        console.log(action)
      const apiUrl = "data/dublin.json";
      await axios
        .get(apiUrl)
        .then(data => setDublinBike(...dublinBike, data.data.dublinBike))
    console.log(dublinBike)
    } else if (e.target.value === "Luas") {
      setAction("Luas");
    } else {
      setAction("none");
    }
  };

  const handleOnSubmit = (data, flag) => {
      console.log(data);
    if (flag === "route") {
      setGetNum({
        route: data,
        stopid: 0,
        flag: flag
      });
    } else if (flag === "stop") {
      setGetNum({
        route: 0,
        stopid: data,
        flag: flag
      });
    }
  };

  return (
    <TransportPresenter
      getNum={getNum}
      setAction={setAction}
      busStop={busStop}
      dublinBike={dublinBike}
      action={action}
      route={route}
      stopId={stopId}
      onChange={handleOnChange}
      nSubmit={handleOnSubmit}
    />
  );
};
