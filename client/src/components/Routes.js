import React from 'react';
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './Login'
import Main from '../Route/MainPage'
import Notice from '../Route/Notice'

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/notice" component={Notice} />
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