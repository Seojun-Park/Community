import React from 'react';
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './Login'
import Main from '../Route/MainPage'
import Notice from '../Route/Notice'
import Market from '../Route/Market'
import Immobiler from '../Route/Immobiler';
import Board from '../Route/Board';
import Write from './boardWrite'
import Detail from './Detail'

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/notice" component={Notice} />
        <Route path="/market" component={Market} />
        <Route path="/immobiler" component={Immobiler} />
        <Route path="/board/detail" component={Detail} />
        <Route path="/board" component={Board} />
        <Route path="/write" component={Write} />
        <Redirect from="*" to="/" />
    </Switch>
)

const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path="/" component={Auth} />
        <Redirect from="*" to="/" />
    </Switch>
)

const AppRouter =({ isLoggedIn }) => 
        isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;
    
AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default AppRouter;