import React, { useState } from "react";
import RouteMap from "./RouteMap";
import CityMap from './CityMap'

export default () => {
  const [action, setAction ] = useState("selection")
  return (
    <div>
      {action === "route" && <RouteMap />}
      <CityMap />
    </div>
  );
};
