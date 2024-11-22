import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {Color} from "../../theme/colors";
import {Fonts} from "../../theme/fonts";
import {CommonStyle} from "../../theme/style";
import {dynamicSize} from "../../utils/helpers";
import BackArrow from "../backArrow";
const HeaderBar = ({
	navigation,
	colorIcon,
	titleColor,
	screenTitle,
	widthStyle,
}) => {
	return (
		<View style={CommonStyle.headingStyleBar}>
			<View style={style.backIcon}>
				<BackArrow navigation={navigation} colorChange={colorIcon} />
			</View>
			<View style={[style.screenTitle, {...widthStyle}]}>
				<Text style={[style.textContent, {...titleColor}]}>{screenTitle}</Text>
			</View>
			<View style={{width: "5%"}}></View>
		</View>
	);
};
export default HeaderBar;
const style = StyleSheet.create({
	backIcon: {
		width: "10%",
		// justifyContent: "center",
	},
	screenTitle: {
		width: "85%",
		alignItems: "center",
	},
	textContent: {
		fontFamily: Fonts.extraBold,
		fontSize: dynamicSize(36),
		lineHeight: 42,
		textAlign: "center",
	},
});
