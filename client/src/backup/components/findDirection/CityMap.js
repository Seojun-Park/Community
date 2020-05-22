import React, { useState, useEffect } from "react";
import { CITY_KEY } from "../../key";

export default () => {
  const [data, setData] = useState([]);

  const params = {
    points: [
      {
        coord: ["40.1", "-73.0"],
        id: "test1"
      },
      {
        coord: ["37.784", "-122.402"]
      },
      {
        coord: ["41.84", "-73"],
        id: "test2"
      },
      {
        id: "test3"
      }
    ]
  };

  return <div>lala</div>;
};
