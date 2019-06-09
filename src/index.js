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
import './style/customDraft.css';

import MainPage from './containers/mainPage';
import PublicPage from './containers/publicPage';
import EditCoursePage from "./containers/editCoursePage";
import CoursePage from "./containers/coursePage";

const store = configurateStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={PublicPage}/>
                <PrivateRoute path='/main_page' component={MainPage}/>
                <Route path='/edit_course/:id' component={EditCoursePage}/>
                <Route path='/edit_page/:courseId/:pageNumber' component={EditCoursePage}/>
                <Route path='/course/:courseId' component={CoursePage}/>
                <Route path='/course_page/:courseId/:pageNumber' component={CoursePage}/>            
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById("app")
);
