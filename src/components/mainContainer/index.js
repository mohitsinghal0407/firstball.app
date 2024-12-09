import {
	View,
	StyleSheet,
	KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "../../theme/colors";
import { dynamicSize } from "../../utils/helpers";

const MainContainer = ({ style, children, containerStyle, fluid }) => {
	return (
		<SafeAreaView style={[styles.container, fluid ? styles.fluid : null]}>
			{/* Scrollable content */}
			<View style={[styles.scrollContainer, containerStyle, style]}>
				{children}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Color.white,
	},
	fluid: {
		flex: 1,
		paddingHorizontal: dynamicSize(10, true),
		backgroundColor: Color.white,
	},
	scrollContainer: {
		flex: 1,
		overflow: "scroll",
	},
});

export default MainContainer;
