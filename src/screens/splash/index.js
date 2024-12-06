import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
} from "react-native";
import style from "./style";
import { splashScreen } from "../../utils/resources";
import Container from "../../components/container";
import { CommonStyle } from "../../theme/style";
import { CommonActions } from "@react-navigation/native";
import DeviceInfo from 'react-native-device-info';

const Splash = (props) => {
	let timeoutScreen;
	const [isLoading, setIsLoading] = useState(true);
	// const checkTokenAndNavigate = async () => {
    //     try {
    //         // Verify if token is valid by making an API call
    //         await AsyncStorage.clear();
    //         const deviceId = DeviceInfo.getUniqueId();
    //         const response = await axiosInstance.post(apiRoutes.registerAndLoginForMobileApp, { mode: 'mobile', username: deviceId });
    //         console.log("Spash Response:", response);
    //         if (response.data.success) {
	// 			setIsLoading(false);
    //             await AsyncStorage.setItem("access_token", response.data.token);
    //             await AsyncStorage.setItem("user_info", JSON.stringify(response.data.user));
    //             props.navigation.dispatch(
	// 				CommonActions.reset({
	// 					index: 1,
	// 					routes: [{ name: "SignIn" }],
	// 				})
	// 			);
    //         } else {
    //             // If token is invalid, remove it
    //             await AsyncStorage.removeItem("access_token");
    //         }
    //     } catch (error) {
    //         // If verification fails, remove token
    //         await AsyncStorage.removeItem("access_token");
    //     }
    // };

	// useEffect(() => {
    //     checkTokenAndNavigate();
    // }, []);

	useEffect(() => {
		timeoutScreen = setTimeout(() => {
			// checkTokenAndNavigate();
			props.navigation.dispatch(
				CommonActions.reset({
					index: 1,
					routes: [{ name: "SignIn" }],
				})
			);
		}, 500);
	}, []);

	return (
		<>
			<Container>
				<Image
					source={splashScreen.genieLogo}
					resizeMode="contain"
					style={{ alignSelf: "center" }}
				/>
				<View style={style.appName}>
					<Text style={CommonStyle.appHeading}>First Ball</Text>
				</View>
				<Image
					source={splashScreen.spinner}
					resizeMode="contain"
					style={{ alignSelf: "center", height: 100, width: 100 }}
				/>
			</Container>
			<View style={style.createdBy}>
				<Text style={style.createdText}> Created by </Text>
				<Text style={style.createdText}> First Ball LLC</Text>
			</View>
		</>
	);
};
export default Splash;
