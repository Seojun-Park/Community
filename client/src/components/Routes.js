import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "../routes/MainPage";
import Notice from "../routes/Notice";
import Write from "../routes/Write";
import Signup from "../routes/Signup";
import Login from "../routes/Login";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/notice" component={Notice} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
