import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	KeyboardAvoidingView,
	YellowBox,
} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Color} from "../../theme/colors";
import {dynamicSize} from "../../utils/helpers";

const MainContainer = ({style, children, containerStyle, fluid}) => {
	return (
		<ScrollView
			centerContent={true}
			scrollEnabled={true}
			showsVerticalScrollIndicator={false}
			contentInsetAdjustmentBehavior="automatic"
			contentContainerStyle={{...containerStyle}}
			style={[styles.container, {...style}]}
			keyboardShouldPersistTaps="handled"
		>
			<SafeAreaView style={fluid ? styles.fluid : null}>
				{children}
			</SafeAreaView>
		</ScrollView>
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
		marginTop: dynamicSize(15, 1),
	},
});

export default MainContainer;
