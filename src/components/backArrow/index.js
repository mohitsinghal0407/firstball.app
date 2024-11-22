import React from "react";
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import {dynamicSize} from "../../utils/helpers";

const BackArrow = ({navigation, colorChange}) => {
	return (
		<TouchableOpacity
			style={styles.button}
			// onPress={() => console.log("hyyy")}
			onPress={() => {
				if (navigation) {
					navigation.goBack();
				}
			}}
		>
			<View>
				<Entypo
					name={"chevron-left"}
					size={30}
					color={colorChange.color ? colorChange.color : colorChange}
				/>
			</View>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		display: "flex",
		flexDirection: "row",
		paddingBottom: dynamicSize(5),
		marginTop: dynamicSize(2, 1),
		// width: '30%',
	},
});

export default BackArrow;
