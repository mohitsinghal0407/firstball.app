import {StyleSheet} from "react-native";
import {Color} from "../../theme/colors";
import {Fonts} from "../../theme/fonts";
import {dynamicSize} from "../../utils/helpers";

export default StyleSheet.create({
	slot: {
		fontSize: dynamicSize(18),
		lineHeight: 24,
		color: Color.primaryPink,
		fontFamily: Fonts.medium,
	},
	dateText: {
		fontSize: dynamicSize(22),
		lineHeight: 24,
		color: Color.primaryPink,
		fontFamily: Fonts.bold,
		paddingTop: dynamicSize(5),
		paddingBottom: dynamicSize(10),
	},
});
