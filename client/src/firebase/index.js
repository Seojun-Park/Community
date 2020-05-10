import React, { useState } from "react";
import styled from "styled-components";
import firebase from "firebase/app";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyBaO81Q1q83ZMkLNeTc6zCjM3xHdXGqG48",
  authDomain: "dublincommunity-55071.firebaseapp.com",
  databaseURL: "https://dublincommunity-55071.firebaseio.com",
  projectId: "dublincommunity-55071",
  storageBucket: "dublincommunity-55071.appspot.com",
  messagingSenderId: "172544347963",
  appId: "1:172544347963:web:d1e9d716188547ea07b11e",
  measurementId: "G-JJP66DSGF9"
};

firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default 
}