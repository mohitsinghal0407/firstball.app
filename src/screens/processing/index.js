import React from "react";
import {View, Text, Image} from "react-native";
import Container from "../../components/container";
import ScreenLoader from "../../components/screenLoader";
import {Color} from "../../theme/colors";
import {Fonts} from "../../theme/fonts";
import {CommonStyle} from "../../theme/style";
import {dynamicSize} from "../../utils/helpers";
import {splashScreen} from "../../utils/resources";
const Processing = () => {
	return (
		<Container containerStyle={{backgroundColor: Color.predictLightBlue}}>
			<View style={{backgroundColor: Color.predictLightBlue}}>
				<Image
					source={splashScreen.spinnerBLue}
					resizeMode="contain"
					style={{
						alignSelf: "center",
						height: 100,
						width: 100,
					}}
				/>
			</View>
			<Text
				style={[
					CommonStyle.descText,
					{
						color: Color.primaryBlue,
						fontFamily: Fonts.bold,
						marginTop: dynamicSize(10, 1),
						textAlign: "center",
					},
				]}
			>
				Processing...
			</Text>
		</Container>
	);
};
export default Processing;
