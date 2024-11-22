import AsyncStorage from "@react-native-async-storage/async-storage";
import {loginUser} from "../store/features/loginSlice";
import {cognitoUserCreate} from "../store/features/registerSlice";
import {setUserFcmToken} from "../store/features/setTokenSlice";
import {showErrorMessage, showSuccessMessage} from "../utils/helpers";

const setUserToken = async (dispatch) => {
	let token = await AsyncStorage.getItem("fcmToken");
	dispatch(
		setUserFcmToken({
			token: token,
		})
	).then((res) => {});
};

// create a user record in our DB)
export const createUser = async (attr, dispatch) => {
	console.log(attr);
	let getCognitoUser = {
		id: attr?.sub,
		email: attr?.email,
		name: attr?.name,
	};

	let response = await dispatch(cognitoUserCreate(getCognitoUser)).then( async(res) => {
		
		if (res?.meta?.requestStatus == "fulfilled") {
			
			await setUserToken(dispatch);
			return {status: true};
			// showSuccessMessage("Create account Successfully");
		} else{
			
			showErrorMessage(res?.payload?.error);
			return {status: false};
			
		}
	});
	
	return response
	
};

export const loginUserService = async (dispatch) => {
	setUserToken(dispatch);
	dispatch(loginUser()).then(async (userRes) => {
		await AsyncStorage.setItem("user_info", JSON.stringify(userRes));
		return true;
	});
};
