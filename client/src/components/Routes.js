import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "../routes/MainPage";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
