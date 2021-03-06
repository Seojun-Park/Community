import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "../routes/MainPage";
import Notice from "../routes/Notice";
import Write from "../routes/Write";
import Signup from "../routes/Signup";
import Login from "../routes/Login";
import Market from "../routes/Market";
import Board from "../routes/Board";
import Rent from "../routes/Rent";
import Detail from "../routes/Detail";
import Profile from "../routes/Profile";
import Edit from "../routes/Edit";
import Meetup from "../routes/Meetup";
import CreateMeetUp from "../routes/CreateMeetUp";
import MeetUpDetail from "../routes/MeetUpDetail";
import Info from "../routes/Information";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/notice" component={Notice} />
    <Route path="/market" component={Market} />
    <Route path="/board" component={Board} />
    <Route path="/rent" component={Rent} />
    <Route path="/signup" component={Signup} />
    <Route path="/login" component={Login} />
    <Route path="/write/:action" component={Write} />
    <Route path="/detail/:id" component={Detail} />
    <Route path="/profile" component={Profile} />
    <Route path="/edit" component={Edit} />
    <Route path="/meetup" component={Meetup} />
    <Route path="/createMeetUp" component={CreateMeetUp} />
    <Route path="/meetupDetail/:id" component={MeetUpDetail} />
    <Route path="/info" component={Info} />
    <Redirect from="*" to="/" />
  </Switch>
);

export default Routes;
