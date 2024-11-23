import {StyleSheet} from "react-native";
import {Color} from "../../../theme/colors";
import {Fonts} from "../../../theme/fonts";
import {dynamicSize} from "../../../utils/helpers";
export default StyleSheet.create({
	logoutText: {
		fontFamily: Fonts.medium,
		fontSize: dynamicSize(18),
		color: Color.primaryBlue,
		paddingLeft: dynamicSize(2, 1),
		alignSelf: "flex-end",
	},
	bottomIcons: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: "auto",
	},
	chatIcon: {
		backgroundColor: Color.primaryPink,
		padding: dynamicSize(8, 1),
		borderRadius: 50,
		marginLeft: dynamicSize(10, 1),
	},
});
