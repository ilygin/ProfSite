import { combineReducers } from 'redux';
import loginUser from './login';
import courses from './courses';



export default combineReducers({
    loginUser,
    courses
})
