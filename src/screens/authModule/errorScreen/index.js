import React from "react";
import {View, Text, StyleSheet} from "react-native";
import AppButton from "../../../components/appButton";
import Container from "../../../components/container";
import MainContainer from "../../../components/mainContainer";
import {CommonStyle} from "../../../theme/style";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Color} from "../../../theme/colors";
import {dynamicSize} from "../../../utils/helpers";

const ErrorScreen = ({navigation}) => {
	return (
		<Container fluid containerStyle={{alignItems: "center"}}>
			<View style={style.closeIcon}>
				<Ionicons
					name="close"
					size={40}
					style={{alignSelf: "center"}}
					color={Color.primaryPink}
				/>
			</View>
			<Text style={[CommonStyle.appHeading, {fontSize: dynamicSize(35)}]}>
				Please check your {"\n"} login details
			</Text>
			<Text style={CommonStyle.descText}>
				It seems like your username or {"\n"} password is incorrect
			</Text>
			<AppButton
				title={"Try again"}
				onPress={() => navigation.navigate("SignIn")}
			/>
		</Container>
	);
};
export default ErrorScreen;

const style = StyleSheet.create({
	closeIcon: {
		backgroundColor: "red",
		alignSelf: "center",
		backgroundColor: "#FFDEE7",
		borderRadius: 50,
		padding: dynamicSize(5, 1),
		marginBottom: dynamicSize(10, 1),
	},
});
