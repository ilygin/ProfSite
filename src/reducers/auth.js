import {
        LOGIN_POST_USER_DATA,
        LOGIN_STATUS_FAILURE_OR_ERROR,
        LOGIN_STATUS_SUCCESS,
        LOGOUT_USER
        } from '../actions/userActions';

const initialState = {
    isFetchingUserData: false,
    statusAuth: "",
    authMsg: "",
    isAuth: false,
    payload: {}
};

export default function loginUser(state = initialState, action) {
    switch (action.type) {
        case LOGIN_POST_USER_DATA:
            return Object.assign({}, state, {
                isFetchingUserData: true,
                statusAuth: "",
                authMsg: "",
                payload: {}
            });
        case LOGIN_STATUS_SUCCESS:
            return Object.assign({}, state, {
                isFetchingUserData: false,
                statusAuth: action.payload.status,
                authMsg: "",
                isAuth: true,
                payload: {
                    email: action.payload.email,
                    roleId: action.payload.roleId
                }
            });
        case LOGIN_STATUS_FAILURE_OR_ERROR:
            return Object.assign({}, state, {
                isFetchingUserData: false,
                statusAuth: action.payload.status,
                authMsg: action.payload.authMsg,
                isAuth: false,
                payload: {}
            });
        case LOGOUT_USER:
            return Object.assign({}, state, {
                isFetchingUserData: false,
                statusAuth: '',
                authMsg: '',
                isAuth: false,
                payload: {}
            });
        default:
            return state
    }
}
    