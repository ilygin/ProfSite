export const LOGIN_POST_USER_DATA= "LOGIN_POST_USER_DATA";
export const LOGIN_STATUS_SUCCESS = "LOGIN_STATUS_SUCCESS";
export const LOGIN_STATUS_FAILURE_OR_ERROR = "LOGIN_STATUS_FAILURE_OR_ERROR";
export const LOGOUT_USER = "LOGOUT_USER";

export const checkUserFieldFull = () => (
		{type: LOGIN_POST_USER_DATA}
);


export const loginStatusSuccess = (payload) => (
	{
		type: LOGIN_STATUS_SUCCESS,
		payload
	}
)

export const loginStatusFailureOrError = (payload) => (
	{
		type: LOGIN_STATUS_FAILURE_OR_ERROR,
		payload
	}
)

export const logoutUser = () => (
	{
		type: LOGOUT_USER
	}
)

export function logInUser(email, password) {
	return function(dispatch) {
		dispatch(checkUserFieldFull());
		if (!email || !password) {
			dispatch(loginStatusFailureOrError({
				status: "failure",
				authMsg: "Заполните поля email и пароль"
			}));
			return;
		}
		const checkUserData = async (email, password) => {
			try {
				let data = await fetch(`${URL}/authAPI/logInUser/`, {
					method: 'post',
					credentials: 'include',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email,
						password
					})
				});
				let checkUserDataJson = data.json();
				if (checkUserDataJson.status === "success") {
					dispatch(loginStatusSuccess(checkUserDataJson));
				}else {
					dispatch(loginStatusFailureOrError(checkUserDataJson));
					return;
				}
			}catch (e) {
				dispatch(loginStatusFailureOrError({
					status: "error",
					authMsg: e.toString()
				}));
			}
		};
		return checkUserData(email, password);
	}
}

// export function checkAuthorizationUser() {
// 	return function (dispatch) {
// 		const checkUserData = async () => {
// 			try {
// 				let data = await fetch(`${URL}/authAPI/isAuthorized`);
// 				let dataJson = data.json();
// 				if(dataJson.isAuthorized) {
// 					dispatch(loginStatusSuccess());
// 				}else {
// 					dispatch(loginStatusFailureOrError());
// 				}
// 			}catch(e) {
// 				dispatch(loginStatusFailureOrError(e.toString()));
// 			}
// 		};
// 		return checkUser();
// 	}
// }

export function logOutUser() {
	return function (dispatch) {
		const logout = async function() {
			await fetch(`${URL}/authAPI/logout`);
			dispatch(logoutUser());
		};
		return logout();
	}
}