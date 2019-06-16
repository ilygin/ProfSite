import {REQUEST_COURSE_CHANGE,
        RECEIVE_COURSE_CHANGE_SUCCESS,
        RECEIVE_COURSE_CHANGE_ERROR} from '../actions/saveCourseActions';

const initialState = {
    isFetching: false,
    msg: ""
};

export default function editCourseStatus(state = initialState, action) {
    switch (action.type) {
        case REQUEST_COURSE_CHANGE:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_COURSE_CHANGE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                msg: action.msg
            });
        case RECEIVE_COURSE_CHANGE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                msg: action.errorMsg
            });
        default:
            return state
    }
}