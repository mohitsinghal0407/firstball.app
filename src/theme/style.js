import {StyleSheet} from "react-native";
import {dynamicSize} from "../utils/helpers";
import {Color} from "./colors";
import {Fonts} from "./fonts";
export const CommonStyle = StyleSheet.create({
	errorMsg: {
		fontSize: 12,
		color: Color.primaryPink,
		paddingBottom: dynamicSize(5),
		marginTop: dynamicSize(10, 1),
		fontFamily: Fonts.semiBold,
		paddingLeft: dynamicSize(10, 1),
	},
	spacingInput: {
		marginVertical: dynamicSize(0),
	},
	appHeading: {
		fontFamily: Fonts.extraBold,
		fontSize: dynamicSize(30),
		color: Color.primaryBlue,
		textAlign: "center",
	},
	outerWrapper: {
		marginVertical: dynamicSize(20, 1),
		alignSelf: "center",
	},
	primaryBtnText: {
		color: Color.white,
	},
	btnText: {
		fontFamily: Fonts.extraBold,
		fontSize: dynamicSize(22),
		textAlign: "center",
	},
	colorWhite: {
		color: Color.white,
	},
	horizontalWrapper: {
		marginHorizontal: dynamicSize(12, 1),
	},
	descText: {
		color: Color.textColor,
		fontFamily: Fonts.regular,
		fontSize: dynamicSize(18),
		lineHeight: 26,
		textAlign: "center",
		paddingTop: dynamicSize(5),
	},
	captionText: {
		color: Color.textColor,
		fontFamily: Fonts.regular,
		fontSize: dynamicSize(18),
		lineHeight: 26,
		marginBottom: 20,
	},
	linkText: {
		fontFamily: Fonts.regular,
		fontSize: dynamicSize(18),
		lineHeight: 26,
		textAlign: "center",
		paddingTop: dynamicSize(10),
		color: Color.primaryBlue,
		textDecorationLine: "underline",
	},
	blueContent: {
		position: "absolute",
		paddingHorizontal: dynamicSize(5, 1),
		paddingVertical: dynamicSize(15, 1),
	},
	pinkContent: {
		position: "absolute",
		paddingHorizontal: dynamicSize(5, 1),
		paddingVertical: dynamicSize(15, 1),
	},
	headingStyleBar: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
	},
	profileIcon: {
		paddingRight: dynamicSize(10, 1),
		alignItems: "flex-end",
	},
	inputBar: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		backgroundColor: Color.inputBg,
		paddingVertical: dynamicSize(8),
		paddingHorizontal: dynamicSize(10, 1),
		borderRadius: 10,
		marginTop: dynamicSize(20, 1),
	},
	input: {
		fontFamily: Fonts.medium,
		fontSize: dynamicSize(18),
		color: Color.primaryBlue,
	},
	blueBoxPrice: {
		backgroundColor: Color.lightBlueBg,
		borderRadius: 15,
		padding: dynamicSize(7, 1),
		alignItems: "center",
		marginTop: dynamicSize(8, 1),
	},
	pinkBoxPrice: {
		backgroundColor: Color.lightPinkBg,
		borderRadius: 15,
		padding: dynamicSize(10, 1),
		alignItems: "center",
		marginTop: dynamicSize(8, 1),
	},
	numberText: {
		color: Color.primaryBlue,
		fontFamily: Fonts.semiBold,
		fontSize: dynamicSize(22),
	},
	numberTextG: {
		color: Color.FFDEE7,
		fontFamily: Fonts.semiBold,
		fontSize: dynamicSize(22),
	},
	profileIcon: {
		paddingRight: dynamicSize(1, 1),
		alignItems: "flex-end",
		paddingVertical: dynamicSize(5, 1),
	},
	mainWrapper: {
		backgroundColor: "#fff",
	},
	topSpacing: {
		marginTop: dynamicSize(15, 1),
	},
	subHeading: {
		fontFamily: Fonts.extraBold,
		fontSize: dynamicSize(36),
		color: Color.primaryBlue,
	},
	captionHeading: {
		fontFamily: Fonts.extraBold,
		fontSize: dynamicSize(24),
		color: Color.primaryPink,
		textAlign: "center",
	},
	profileBlock: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
	dots: {
		height: 15,
		width: 15,
		borderRadius: 16,
		marginLeft: 8,
	},
	centerContent: {
		justifyContent: "center",
		alignItems: "center",
	},
	userName: {
		fontFamily: Fonts.extraBold,
		fontSize: dynamicSize(32),
		color: Color.primaryBlue,
		paddingTop: dynamicSize(5, 1),
	},
	headerSpacing: {
		paddingHorizontal: dynamicSize(5, 1),
		paddingTop: dynamicSize(15, 1),

		// backgroundColor: "red",
	},
	pageNumber: {
		textAlign: "center",
		fontFamily: Fonts.extraBoldItalic,
		fontSize: dynamicSize(16),
		color: Color.primaryBlue,
	},
	footer: {
		display: "flex",
		flexDirection: "row",
		// marginTop: dynamicSize(5, 1),
		marginTop: 20,
	},
	modalTitle: {
		fontSize: dynamicSize(18),
		fontFamily: Fonts.semiBold,
		color: Color.primaryBlue,
		lineHeight: 23,
		textAlign: "center",
	},
	footerBg: {
		backgroundColor: Color.white,
	},
});
