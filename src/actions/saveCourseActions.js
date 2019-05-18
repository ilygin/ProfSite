import {URL} from '../consts';
export const REQUEST_COURSE_CHANGE = 'REQUEST_COURSE_CHANGE';
export const RECEIVE_COURSE_CHANGE_SUCCESS = 'RECEIVE_COURSE_CHANGE_SUCCESS';
export const RECEIVE_COURSE_CHANGE_ERROR = 'RECEIVE_COURSE_CHANGE_ERROR';

export const requestCourseChamge = () => (
    {
		type: REQUEST_COURSE_CHANGE
    }
)

export const receiveCourseChangeSuccess = (payload) => (
    {
        type: RECEIVE_COURSE_SUCCESS,
        payload
    }
)

export const receiveCourseChangeError = (errorMsg) => (
    {
        type: RECEIVE_COURSE_ERROR,
        errorMsg
    }
)

export function saveCourseChange(courseTitle, units, sections, courseId) {
	return function (dispatch) {
		dispatch(requestCourseChamge());
		const sendRequest = async () => {
			try {
				const data = await fetch(`${URL}/courseAPI/saveCourseChange`, {
					method: 'post',
					credentials: 'include',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						courseTitle,
                        units,
                        sections,
                        courseId
					})
				});

                // const responseJson = await response.json();
                // if(responseJson.status ==="success") {
                //     dispatch(receiveCourseChangeSuccess(responseJson.payload));
                // }else {
                //     dispatch(receiveCourseChangeError(responseJson.errorMsg));
                // }
			} catch (e) {
				dispatch(receiveCourseChangeError(e.toString()));
			}
		};
		return sendRequest();
	}
}