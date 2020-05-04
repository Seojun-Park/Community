import React from 'react';
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './Login'
import Main from '../Route/MainPage'
import Notice from '../Route/Notice'
import Market from '../Route/Market'
import Immobiler from '../Route/Immobiler'
import Board from '../Route/Board';
import BoardWrite from '../Route/Board/boardWrite'
import MarketWrite from '../Route/Market/marketWrite'
import Detail from './Detail'
import Bike from './Bike'
import Direction from './findDirection'

const LoggedInRoutes = () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/bike" component={Bike} />
        <Route path="/direction" component={Direction} />
        <Route path="/notice" component={Notice} />
        <Route path="/immobiler" component={Immobiler} />
        <Route path="/board/detail" component={Detail} />
        <Route path="/board/write" component={BoardWrite} />
        <Route path="/board" component={Board} />
        <Route path="/market/write" component={MarketWrite} />
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