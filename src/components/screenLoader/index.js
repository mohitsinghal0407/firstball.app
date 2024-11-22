import React from "react";
import {View, Image} from "react-native";
import {splashScreen} from "../../utils/resources";

import Container from "../container";
const ScreenLoader = () => {
	return (
		<Container containerStyle={{marginTop: "70%"}}>
			<View style={{padding: 2}}>
				<Image
					source={splashScreen.spinner}
					resizeMode="contain"
					style={{
						alignSelf: "center",
						height: 100,
						width: 100,
					}}
				/>
			</View>
		</Container>
	);
};
export default ScreenLoader;
