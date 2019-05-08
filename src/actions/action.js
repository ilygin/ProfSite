export const LOGIN_POST_USER_DATA= "LOGIN_POST_USER_DATA";
export const LOGIN_STATUS_SUCCESS = "LOGIN_STATUS_SUCCESS";
export const LOGIN_STATUS_ERROR = "LOGIN_STATUS_ERROR";
export const LOGIN_STATUS_FAILURE = "LOGIN_STATUS_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";

export function checkUserData() {
	return {
		type: LOGIN_POST_USER_DATA
	}
}

export function loginStatusSuccess() {
	return {
		type: LOGIN_STATUS_SUCCESS,
	}
}

export function loginStatusFailure(msgLogin) {
	return {
		type: LOGIN_STATUS_FAILURE,
		msgLogin
	}
}

export function loginStatusError(msg) {
	return {
		type: LOGIN_STATUS_ERROR,
		msg
	}
}

export function logoutUser() {
	return {
		type: LOGOUT_USER
	}
}

export function logInUser(email, password) {
	return function(dispatch) {
		dispatch(checkUserData());
		if (!email || !password) {
			dispatch(loginStatusError("Заполните поля email и пароль"));
			return("Заполните поля email и пароль");
		}
		const checkUser = async (email, password) => {
			try {
				let data = await fetch(`${URL}/auth/logInUser/`, {
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
				let checkUserDataJson = await data.json();
				if (checkUserDataJson.status === "success") {
					dispatch(loginStatusSuccess());
				}else {
					dispatch(loginStatusFailure(checkUserDataJson.msg));
					return(checkUserDataJson.msg);
				}
			}catch (e) {
				dispatch(loginStatusError(e.toString()));
			}
		};
		return checkUser(email, password);
	}
}

export function checkAuthorizationUser() {
	return function (dispatch) {
		const checkUser = async () => {
			try {
				let data = await fetch(`${URL}/auth/isAuthorized`);
				let dataJson = await data.json();
				if(dataJson.isAuthorized) {
					dispatch(loginStatusSuccess());
				}else {
					dispatch(loginStatusFailure());
				}
			}catch(e) {
				dispatch(loginStatusError(e.toString()));
			}
		};
		return checkUser();
	}
}

export function logOutUser() {
	return function (dispatch) {
		const logout = async function() {
			try {
				await fetch(`${URL}/auth/logout`);
				dispatch(logoutUser());
			}catch(e) {
				dispatch(loginStatusError(e.toString()));
			}
		};
		return logout();
	}
}