import {StyleSheet} from "react-native";
import {Color} from "../../theme/colors";
import {Fonts} from "../../theme/fonts";
import {dynamicSize} from "../../utils/helpers";
export default StyleSheet.create({
	appName: {
		marginVertical: dynamicSize(20, 2),
	},
	createdBy: {
		justifyContent: "center",
		alignContent: "center",
		fontFamily: Fonts.black,
		alignItems: "center",
		paddingBottom: dynamicSize(20, 1),
		backgroundColor: "#fff",
	},
	createdText: {
		color: Color.primaryBlue,
		fontSize: dynamicSize(20),
		display: "flex",
		marginTop: "auto",
		fontFamily: Fonts.medium,
	},
});
