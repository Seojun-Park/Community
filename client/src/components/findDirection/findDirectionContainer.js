import React, { useState } from "react";
import RouteMap from "./RouteMap";
import CityMap from "./CityMap";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

export default () => {
  const [action, setAction] = useState("selection");
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenuChange = (e, data) => {
    if (data === 0) {
      setAction("route");
    } else if (data === 1) {
      setAction("transport");
    } else {
      setAction("something");
    }
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleMenuChange}
          component="div"
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Find Route" component="div" />
          <Tab label="Transportation" />
          <Tab label="Item Three" />
        </Tabs>
      </Paper>
      {action === "route" && <RouteMap />}
    </div>
  );
};
