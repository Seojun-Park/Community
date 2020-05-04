import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useInput from "../InputTool";
import Input from "../Input";
import { toast } from "react-toastify";
import Button from '../Button'
import { GOOGLE_KEY } from '../../key'


const url = `json?origin=Dublin&destination=Rathmine=transit&departure_time=now&key=${GOOGLE_KEY}`;
const Wrapper = styled.div``;


export default () => {
  const [action, setAction] = useState("off");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const from = useInput("");
  const to = useInput("");

  let [curLat, setCurLat] = useState(0);
  let [curLng, setCurLng] = useState(0);

  const onSubmit = async e => {
    e.preventDefault();
    console.log(from);
    if (action === "off") {
      if (from.value === "" && to !== "") {
        // ask permition for current position && setOrigin(from.value)
        setDestination(to.value);
        setAction("on");
      } else if (to === "") {
        toast.error("to field is required");
      } else if (from.value !== "" && to !== "") {
        setOrigin(from.value);
        setDestination(to.value);
      }
    }
  };

  // useEffect(() => {
  //   if(action === "on"){
  //     getLocation();
  //   }
  // });

  // window.onload = getLocation;
  // const getLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       p => {
  //         setCurLat(p.coords.latitude);
  //         setCurLng(p.coords.longitude)
  //       },
  //       e => {
  //         console.log("에러가 발생햇드아.....");
  //       }
  //     );
  //   } else {
  //     console.log("no geolocation");
  //   }
  // };

  // console.log(from.value);
  console.log(curLat, curLng)


  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <Input
          placeholder={"From"}
          setValue={from.value}
          onChange={from.onChange}
        />
        <Input placeholder={"To"} setValue={to.value} onChange={to.onChange} />
      </form>
    </Wrapper>
  );
};
