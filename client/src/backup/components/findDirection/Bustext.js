import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "../Input";

export default ({ route, stop }) => {
  const [searchFlag, setSearchFlag] = useState("off");
  const [action, setAction] = useState("none");
  let routeNumber = [];
  let stopNumber = [];
  console.log(action, route, stop);

  const handleChange = e => {
    if (e.target.value === "route") {
      setAction("route");
      setSearchFlag("routeOn");
    } else if (e.target.value === "stop") {
      setAction("stop");
      setSearchFlag("stopOn");
    } else {
      setAction("none");
    }
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="options" name="opstions" defaultValue="">
        {action === "none" ? (
          <>
            <FormControlLabel
              value="route"
              control={<Radio />}
              label="버스번호로 찾기"
              onChange={handleChange}
            />
            <FormControlLabel
              value="stop"
              control={<Radio />}
              label="정류장으로 찾기"
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            {(action === "route" && (
              <>
                <FormControlLabel
                  value="route"
                  control={<Radio />}
                  label="버스번호로 찾기"
                  onChange={handleChange}
                />
                <Input placeholder={"Route"} setValue={route.value} onChnage={route.onChage} />
              </>
            )) || (
              <>
                {action === "stop" && (
                  <>
                    <FormControlLabel
                      value="stop"
                      control={<Radio />}
                      label="정류장으로 찾기"
                      onChange={handleChange}
                    />
                    <Input placeholder={"Route"} setValue={route.value} onChnage={route.onChage} />
                  </>
                )}
              </>
            )}
          </>
        )}
      </RadioGroup>
    </FormControl>
  );
};
