import { combineReducers } from 'redux';
import loginUser from './auth';
import courses from './courses';



export default combineReducers({
    loginUser,
    courses
})
