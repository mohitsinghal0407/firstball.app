import React, { useEffect } from "react";
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

const Splash = (props) => {
	let timeoutScreen;

	useEffect(() => {
		timeoutScreen = setTimeout(() => {
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
