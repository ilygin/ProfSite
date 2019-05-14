import {REQUEST_COURSE,
    RECEIVE_COURSE_SUCCESS,
        RECEIVE_COURSE_ERROR} from '../actions/loadCourses';

const initialState = {
    isFetching: false,
    payload: []
};

export default function courses(state = initialState, action) {
    switch (action.type) {
        case REQUEST_COURSE:
            return Object.assign({}, state, {
                isFetching: true,
                payload: []
            });
        case RECEIVE_COURSE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                payload: action.payload,
            });
        case RECEIVE_COURSE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                errorMsg: action.msg,
                payload: []
            });
        default:
            return state
    }
}