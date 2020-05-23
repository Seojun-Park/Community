import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "../routes/MainPage";
import Notice from "../routes/Notice";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/notice" component={Notice} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
