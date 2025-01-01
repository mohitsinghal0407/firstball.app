import {
	View,
	StyleSheet,
	Image,
	Linking,
	TouchableOpacity,
	Text,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { dynamicSize } from "../../utils/helpers";
import { Color } from "../../theme/colors";
import { Config } from "../../config";

const siteUrl = Config.siteUrl;

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

			{/* Footer */}
			<View style={styles.footer}>
				<TouchableOpacity onPress={() => Linking.openURL(`${siteUrl}/contact_us.html`)}>
					<Text style={styles.footerLink}>Contact Us</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => Linking.openURL(`${siteUrl}/privacy_policy.html`)}>
					<Text style={styles.footerLink}>Privacy Policy</Text>
				</TouchableOpacity>
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
	footer: {
		position: "absolute",
		bottom: 0,
		left: 0, // Ensure the footer starts from the left edge
		right: 0, // Ensure the footer extends to the right edge
		backgroundColor: Color.primaryRed,
		padding: 10,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	footerLink: {
		color: Color.white,
		fontSize: 16,
	},
});

export default MainContainer;
