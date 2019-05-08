import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configurateStore from './store/configurateStore';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './containers/privateRoute';

import './style/index.css';
import './style/sidebar.css';
import './style/mainPage.css';

import MainPage from './containers/mainPage';
import PublicPage from './containers/publicPage';

const store = configurateStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={PublicPage}/>
                <PrivateRoute path='/main_page' component={MainPage}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);
