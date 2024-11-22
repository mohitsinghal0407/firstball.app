import {Dimensions, ToastAndroid, Alert} from "react-native";
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import {heightToDp, widthToDp} from "./responsive";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const {width, height} = Dimensions.get("window");

export const dynamicSize = (val, byWidth = false) => {
	return RFValue(parseFloat(val), byWidth ? width : height);
};
export const dynamicSizeByPercentage = (
	val,
	{byWidth = false, byHeight = false}
) => {
	if (byWidth) {
		return widthToDp(val);
	}
	if (byHeight) {
		return heightToDp(val);
	}
	return RFPercentage(val);
};

export const showErrorMessage = (msg) => {
	if (typeof msg == "string") {
		showAlert("Oops!", msg);
		return;
	}
};
export const showSuccessMessage = (msg) => {
	if (typeof msg == "string") {
		showAlert("Success!", msg);
		return;
	}
};

export const showAlert = (key = "Success", value) => {
	Platform.OS == "ios" ? Alert.alert(key, value) : Toast(value);
};

export const Toast = (message) => {
	ToastAndroid.showWithGravityAndOffset(
		message,
		ToastAndroid.LONG,
		ToastAndroid.BOTTOM,
		25,
		50
	);
};
