import { combineReducers } from 'redux';
import loginUser from './auth';
import courses from './courses';
import editCourseStatus from './editCourse';

export default combineReducers({
    loginUser,
    courses,
    editCourseStatus,
})
