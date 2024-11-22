import {View, Text, ScrollView, StyleSheet} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {dynamicSize} from "../../utils/helpers";

const Container = ({style, children, containerStyle, fluid}) => {
	return (
		<ScrollView
			centerContent={true}
			scrollEnabled={true}
			contentInsetAdjustmentBehavior="automatic"
			contentContainerStyle={[styles.scrollContainer, {...containerStyle}]}
			keyboardShouldPersistTaps="handled"
			style={[styles.container, {...style}]}
		>
			<SafeAreaView style={fluid ? styles.fluid : null}>
				{children}
			</SafeAreaView>
		</ScrollView>
	);
};

export default Container;

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center",
		alignContent: "center",
		backgroundColor: "#fff",
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	fluid: {
		paddingHorizontal: dynamicSize(10, true),
		backgroundColor: "#fff",
	},
});
