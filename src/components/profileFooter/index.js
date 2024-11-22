import React, {useEffect} from "react";
import {View, Text, TouchableOpacity, Image, StyleSheet} from "react-native";
import {Color} from "../../theme/colors";
import {dynamicSize} from "../../utils/helpers";
import {splashScreen} from "../../utils/resources";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch, useSelector} from "react-redux";
import {setNavigation} from "../../store/features/setNavigationSlice";
import {CommonActions} from "@react-navigation/native";

const ProfileFooter = ({iconSpacing, navigation}) => {
	const dispatch = useDispatch();
	const backNavigation = useSelector((state) => state.setNavigation.status);
	const pressing = async () => {
		dispatch(setNavigation({status: true}));
		let access_token = await AsyncStorage.getItem("access_token");
		if (access_token) {
			// navigation.navigate("UserProfile");
			navigation.dispatch(
				CommonActions.reset({
					index: 1,
					routes: [{name: "UserProfile"}],
				})
			);
		} else {
			navigation.navigate("SignIn");
		}
	};

	// useEffect(() => {
	// 	console.log("backNavigation :", backNavigation);
	// 	navigation.addListener("beforeRemove", (e) => {
	// 		if (!backNavigation) {
	// 			e.preventDefault();
	// 		} else {
	// 			console.log("check-->", backNavigation);
	// 			dispatch(setNavigation({status: true}));
	// 			navigation.dispatch(e.data.action);
	// 		}
	// 	});
	// }, [backNavigation]);

	return (
		<TouchableOpacity
			style={[style.profileThumb, {...iconSpacing}]}
			onPress={() => pressing()}
		>
			<Image
				source={splashScreen.profileIcon}
				// style={{height: 50, width: 50}}
			/>
		</TouchableOpacity>
	);
};

const style = StyleSheet.create({
	profileThumb: {
		paddingRight: dynamicSize(10, 1),
		alignItems: "flex-end",
		marginLeft: "auto",
		width: "25%",
		marginVertical: dynamicSize(25, 1),
	},
});
export default ProfileFooter;
