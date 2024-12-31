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
					style={{ 
						alignSelf: "center", 
						width: '80%', // Adjust width to fit mobile screens
						maxHeight: 200, // Set a max height to prevent overflow
					}}
				/>
				<Image
					source={splashScreen.spinner}
					resizeMode="contain"
					style={{ alignSelf: "center", height: 100, width: 100 }}
				/>
			</Container>
			<View style={style.createdBy}>
				<Text style={style.createdText}> Created by </Text>
				<Text style={style.createdText}> FirstBall</Text>
			</View>
		</>
	);
};
export default Splash;
