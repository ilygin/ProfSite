import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configurateStore from './store/configurateStore';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import './style/index.css';
import './style/sidebar.css';

import MainPage from './containers/mainPage';


const store = configurateStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={MainPage}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);
