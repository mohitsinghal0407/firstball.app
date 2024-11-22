import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";

import {Linking} from "react-native";

export async function requestUserPermission() {
	const authStatus = await messaging().requestPermission();
	const enabled =
		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		authStatus === messaging.AuthorizationStatus.PROVISIONAL;

	if (enabled) {
		// console.log('Authorization status:', authStatus);
		getFCMToken();
	}
}

const getFCMToken = async () => {
	let fcmToken = await AsyncStorage.getItem("fcmToken");
	console.log("fcmToken :", fcmToken);
	if (!fcmToken) {
		try {
			fcmToken = await messaging().getToken();
			if (fcmToken) {
				await AsyncStorage.setItem("fcmToken", fcmToken);
			}
		} catch (error) {}
	}
};
