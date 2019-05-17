import {URL} from '../consts';
export const REQUEST_COURSE = 'REQUEST_COURSE';
export const RECEIVE_COURSE_SUCCESS = 'RECEIVE_COURSE_SUCCESS';
export const RECEIVE_COURSE_ERROR = 'RECEIVE_COURSE_ERROR';

export const requestCourses = () => (
    {
		type: REQUEST_COURSE
    }
)

export const receiveCoursesSuccess = (payload) => (
    {
        type: RECEIVE_COURSE_SUCCESS,
        payload
    }
)

export const requestCoursesError = (errorMsg) => (
    {
        type: RECEIVE_COURSE_ERROR,
        errorMsg
    }
)

export function loadCourses(isPublic) {
	return function (dispatch) {
		dispatch(requestCourses());
		const request = async () => {
			try {
                debugger;
                const response = await fetch(`${URL}/courseAPI/loadCourses?isPublic=${+isPublic}`);
                
                const responseJson = await response.json();
                if(responseJson.status ==="success") {
                    dispatch(receiveCoursesSuccess(responseJson.payload));
                }else {
                    dispatch(requestCoursesError(responseJson.errorMsg));
                }
			} catch (e) {
				dispatch(requestCoursesError(e.toString()));
			}
		};
		return request(isPublic);
	}
}