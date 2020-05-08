import React from 'react';
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './Login'
import Main from '../Route/MainPage'
import Notice from '../Route/Notice'
import Market from '../Route/Market'
import News from '../Route/News'
import Board from '../Route/Board';
import Write from './Write'
import Detail from './Detail'
import Direction from './findDirection'

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/direction" component={Direction} />
        <Route path="/notice" component={Notice} />
        <Route path="/news" component={News} />
        <Route path="/board/:id" exact component={Detail} />
        <Route path="/board/write" component={Write} />
        <Route path="/board" component={Board} />
        <Route path="/market/write" component={Write} />
        <Route path="/market" component={Market} />
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