import {StyleSheet} from "react-native";
import {Color} from "../../theme/colors";
import {Fonts} from "../../theme/fonts";
import {dynamicSize} from "../../utils/helpers";

export default StyleSheet.create({
	lockIcon: {
		alignItems: "center",
	},
	socialIcons: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		marginTop: dynamicSize(10, 1),
	},
	appleIcon: {
		width: "33.3%",
		alignItems: "flex-end",
	},
	googleIcon: {
		width: "33.3%",
		alignItems: "center",
	},
	facebookIcon: {
		width: "33.3%",
	},
	closeIcon: {
		backgroundColor: "red",
		alignSelf: "center",
		backgroundColor: "#FFDEE7",
		borderRadius: 50,
		padding: dynamicSize(5, 1),
		marginBottom: dynamicSize(20, 1),
	},
});
