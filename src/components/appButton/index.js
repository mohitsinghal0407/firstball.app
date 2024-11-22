import React from "react";
import {
	View,
	Text,
	ActivityIndicator,
	StyleSheet,
	TouchableOpacity,
	Image,
} from "react-native";
import {Color} from "../../theme/colors";
import {CommonStyle} from "../../theme/style";
import {dynamicSize} from "../../utils/helpers";
import {splashScreen} from "../../utils/resources";

const AppButton = ({
	title,
	onPress,
	textStyle,
	containerStyle,
	disabled,
	isLoading,
	bgStyle,
	link,
}) => {
	return (
		<TouchableOpacity onPress={onPress} disabled={disabled}>
			<View
				style={[
					link ? null : [styles.btn, {...bgStyle}],
					{...containerStyle},
					disabled && {...styles.disabled},
				]}
			>
				{isLoading && !link ? (
					<View style={{padding: 2}}>
						<Image
							source={splashScreen.spinner}
							resizeMode="contain"
							style={{alignSelf: "center", height: 20, width: 20}}
						/>
						{/* <ActivityIndicator color={Color.white} /> */}
					</View>
				) : (
					<Text
						style={
							link
								? [
										CommonStyle.linkText,
										CommonStyle.primaryBtnText,
										{...textStyle},
								  ]
								: [CommonStyle.btnText, CommonStyle.colorWhite, {...textStyle}]
						}
					>
						{title}
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btn: {
		backgroundColor: Color.primaryPink,
		padding: dynamicSize(15),
		borderRadius: 16,
		marginVertical: 10,
		width: "100%",
	},
	disabled: {
		backgroundColor: Color.lightPinkBg,

	},
});
export default AppButton;
