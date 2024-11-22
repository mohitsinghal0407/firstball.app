import React from "react";
import {View, Image, Text} from "react-native";
import {splashScreen, predictResult} from "../../utils/resources";
import Entypo from "react-native-vector-icons/Entypo";
import Container from "../container";
import { Color } from "../../theme/colors";
const NoResultScreen = () => {
	return (
		<Container containerStyle={{marginTop: "50%"}}>
			<View style={{padding: 2}}>
				<Image
					source={predictResult.search}
					resizeMode="contain"
					style={{
						alignSelf: "center",
						height: 150,
						width: 150,
						
					}}
				/>
			</View>
		</Container>
	);
};
export default NoResultScreen;
