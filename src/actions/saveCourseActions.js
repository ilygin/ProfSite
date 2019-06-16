import {URL} from '../consts';
export const REQUEST_COURSE_CHANGE = 'REQUEST_COURSE_CHANGE';
export const RECEIVE_COURSE_CHANGE_SUCCESS = 'RECEIVE_COURSE_CHANGE_SUCCESS';
export const RECEIVE_COURSE_CHANGE_ERROR = 'RECEIVE_COURSE_CHANGE_ERROR';

export const requestCourseChamge = () => (
    {
		type: REQUEST_COURSE_CHANGE
    }
)

export const receiveCourseChangeSuccess = () => (
    {
		type: RECEIVE_COURSE_CHANGE_SUCCESS,
		msg: "Успешно сохранен"
    }
)

export const receiveCourseChangeError = (errorMsg) => (
    {
        type: RECEIVE_COURSE_CHANGE_ERROR,
        errorMsg
    }
)

export function saveCourseChange(courseTitle, units, sections, courseId) {
	return function (dispatch) {
		dispatch(requestCourseChamge());
		const sendRequest = async () => {
			try {
				let tableContentsJson = {units, sections};
				let tableContents = JSON.stringify(tableContentsJson);
				const responseSaveOrUpdateCourse = await fetch(`${URL}/courseAPI/saveCourseChange`, {
					method: 'post',
					credentials: 'include',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						courseTitle,
						tableContents,
                        courseId
					})
				});
                const responseJson = await responseSaveOrUpdateCourse.json();
                if(responseJson.status ==="success") {
                    dispatch(receiveCourseChangeSuccess());
                }else {
                    dispatch(receiveCourseChangeError(responseJson.errorMsg));
                }
			} catch (e) {
				dispatch(receiveCourseChangeError(e.toString()));
			}
		};
		return sendRequest();
	}
}