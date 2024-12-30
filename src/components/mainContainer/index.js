import {
	View,
	StyleSheet,
	Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { dynamicSize } from "../../utils/helpers";

const MainContainer = ({ style, children, containerStyle, fluid }) => {
	return (
		<SafeAreaView style={[styles.container, fluid ? styles.fluid : null]}>
			{/* Header Bar */}
			<View style={styles.header}>
				<View style={styles.logoContainer}>
					<Image
						source={require("../../assets/logo-vertical.png")} // Update with the correct path to your logo
						style={styles.logo}
						resizeMode="contain"
					/>
				</View>
			</View>

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
		backgroundColor: "white",
	},
	fluid: {
		flex: 1,
		paddingHorizontal: dynamicSize(10, true),
		backgroundColor: "white",
	},
	scrollContainer: {
		flex: 1,
		overflow: "scroll",
	},
	header: {
		height: dynamicSize(40, true),
		flexDirection: "row",
		justifyContent: "center", // Center the logo horizontally
		alignItems: "center",
		backgroundColor: "transparent", // Transparent background
		paddingHorizontal: dynamicSize(15, true),
	},
	logoContainer: {
		alignItems: "center", // Center the logo vertically
	},
	logo: {
		width: dynamicSize(100, true), // Adjust logo width as needed
		height: dynamicSize(40, true), // Adjust logo height as needed
	},
});

export default MainContainer;
