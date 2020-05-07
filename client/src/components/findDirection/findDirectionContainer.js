import React, { useState } from "react";
import RouteMap from "./RouteMap";
import TransInfo from './TransporInfo'
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Transport from './TransportContainer'

const Wrapper = styled.div``

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

export default () => {
  const [action, setAction] = useState("transport");
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setAction("transport");
    } else if (newValue === 1) {
      setAction("route");
    } else {
      setAction("something");
    }
  };

  return (
    <Wrapper>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          component="div"
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Transportation" component="div" />
          <Tab label="Find Route" component="div" />
          <Tab label="Item Three" />
        </Tabs>
      </Paper>
      {(action === "route" && <RouteMap />) || (action === "transport" && <TransInfo />)}
    </Wrapper>
  );
};
