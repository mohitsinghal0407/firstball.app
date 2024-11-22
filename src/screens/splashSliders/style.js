import {StyleSheet} from "react-native";
import {Color} from "../../theme/colors";
import {Fonts} from "../../theme/fonts";
import {dynamicSize} from "../../utils/helpers";
export default StyleSheet.create({
	flatBg: {
		backgroundColor: Color.lightBlueBg,
		borderRadius: 16,
		padding: dynamicSize(18, 1),
		// paddingBottom: dynamicSize(0),
		// paddingHorizontal: dynamicSize(8, 1),
		margin: dynamicSize(5, 1),
		height: "110%",
		// justifyContent: "center",
	},
	textCenter: {
		justifyContent: "center",
		alignItems: "center",
	},
	headingList: {
		fontFamily: Fonts.extraBold,
		color: Color.primaryBlue,
		textAlign: "center",
		fontSize: dynamicSize(30),
		paddingTop: dynamicSize(10),
	},
});
