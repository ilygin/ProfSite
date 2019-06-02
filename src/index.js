import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configurateStore from './store/configurateStore';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './containers/privateRoute';

import './style/index.css';
import './style/sidebar.css';
import './style/mainPage.css';
import './style/courseList.css';
import './style/tableContents.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import MainPage from './containers/mainPage';
import PublicPage from './containers/publicPage';
import EditCoursePage from "./containers/editCoursePage";

const store = configurateStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={PublicPage}/>
                <PrivateRoute path='/main_page' component={MainPage}/>
                <Route path='/edit_course/:id' component={EditCoursePage}/>
                <Route path='/edit_page/:courseId/:pageId' component={EditCoursePage}/>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);
