import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "../Input";
import useInput from "../InputTool";
import Button from "../Button";
import { SearchIcon } from "../Icon";

export default submitData => {
  const [action, setAction] = useState("none");
  const [searchFlag, setSearchFlag] = useState("off");
  const route = useInput("");
  const stopId = useInput("");
  let routeNumber = [];
  let stopNumber = [];

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

  const handleSumbit = e => {
    e.preventDefault();
    if (searchFlag === "routeOn") {
      routeNumber = route.value;
      submitData.onSubmit(routeNumber, "route");
      route.setValue("")
      setAction("none")
      setSearchFlag("off")
    } else if (searchFlag === "stopOn") {
      stopNumber = stopId.value;
      submitData.onSubmit(stopNumber, "stop");
      stopId.setValue("")
      setAction("none")
      setSearchFlag("off")
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
                {searchFlag === "routeOn" && (
                  <form onSubmit={handleSumbit}>
                    <Input
                      placeholder="Route number"
                      value={route.value}
                      onChange={route.onChange}
                    />
                    <Button text="route">{SearchIcon}</Button>
                  </form>
                )}
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
                    {searchFlag === "stopOn" && (
                      <form onSubmit={handleSumbit}>
                        <Input
                          placeholder="stop number"
                          value={stopId.value}
                          onChange={stopId.onChange}
                        />
                        <Button text="stopId">{SearchIcon}</Button>
                      </form>
                    )}
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
