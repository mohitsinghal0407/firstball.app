import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {CommonStyle} from "../../theme/style";
import MainContainer from "../mainContainer";
import Feather from "react-native-vector-icons/Feather";
import {Color} from "../../theme/colors";
import {Fonts} from "../../theme/fonts";
import {dynamicSize} from "../../utils/helpers";
const CustomCheckBox = ({
	isChecked,
	checkTitle,
	onPress,
	bgColor,
	checkColor,
	keyValue,
}) => {
	const iconName = isChecked ? "check" : null;

	return (
		<View>
			<View style={[CommonStyle.headingStyleBar]}>
				<TouchableOpacity onPress={onPress}>
					<Feather
						name={iconName}
						size={20}
						color={keyValue == "reveal" ? Color.primaryBlue : Color.primaryPink}
						style={[styles.iconStyle, {...bgColor}]}
					/>
				</TouchableOpacity>
				<View>
					<Text style={styles.checkTitleStyle}>{checkTitle}</Text>
				</View>
			</View>
			{/* <Text></Text> */}
		</View>
	);
};

const styles = StyleSheet.create({
	checkTitleStyle: {
		color: Color.textColor,
		fontFamily: Fonts.regular,
		fontWeight: "600",
		fontSize: dynamicSize(18),
		marginLeft: dynamicSize(10),
		top: -10,
	},
	iconStyle: {
		borderRadius: 5,
		width: 30,
		height: 30,
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		alignSelf: "center",
		paddingVertical: dynamicSize(5),
		paddingHorizontal: dynamicSize(5),
	},
});
export default CustomCheckBox;
