import {StyleSheet} from "react-native";
import {Color} from "../../theme/colors";
import {Fonts} from "../../theme/fonts";
import {dynamicSize} from "../../utils/helpers";

export default StyleSheet.create({
	questionTittle: {
		fontSize: dynamicSize(22),
		lineHeight: 30,
		fontFamily: Fonts.bold,
	},
	toggleBlock: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		marginVertical: dynamicSize(10, 1),

		// borderBottomWidth: 2,
		// borderBottomColor: Color.lightBlueBg,
	},
	questionSection: {
		width: "80%",
	},
	dropDown: {
		width: "20%",
		justifyContent: "flex-start",
		alignItems: "flex-end",
		paddingRight: dynamicSize(10, 1),
	},
	hrLine: {
		borderBottomWidth: 2,
		borderBottomColor: Color.lightBlueBg,
		marginTop: dynamicSize(10),
	},
});
