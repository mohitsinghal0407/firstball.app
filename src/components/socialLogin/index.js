import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Color } from "../../theme/colors";
import { CommonStyle } from "../../theme/style";
import { dynamicSize } from "../../utils/helpers";
import { planResults, resultShare } from "../../utils/resources";
import config from "../../aws-exports";
import { Amplify, Auth, Hub } from "aws-amplify";
import { loginScreen } from "../../utils/resources";
import style from "./style";
import { cognitoUser } from "../../store/features/registerSlice";
import {useDispatch} from "react-redux";
const SocialLogin = ({ navigation }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		console.log("aagya")
		Auth.currentAuthenticatedUser()
		  .then((user) => {

			user.getUserData((err, userData) => {

				// let data = {
				// 		email: userData?.UserAttributes.find((ud) => ud.Name === "email")
				// 		  ?.Value,
				// 	  }
				console.log("currentAuthenticatedUser userData: ",userData)
			//   setUser({
			// 	email: userData?.UserAttributes.find((ud) => ud.Name === "email")
			// 	  ?.Value,
			//   });
			});
		  })
		  .catch((error) => {

			console.log("currentAuthenticatedUser error: ",error)
		
		  });
	  },[] );

	// create a user record in our DB)
	const createUser = async (registerPostData, registerAWSCognitoResponce) => {
		let getCognitoUser = {
			id: registerAWSCognitoResponce?.userSub,
			email: registerPostData.email,
			name: registerPostData.name,
		};
		dispatch(cognitoUser(getCognitoUser)).then((res) => {
			setIsLoading(false);
			if (res?.payload == "") {
				setUserToken();
				showSuccessMessage("Account has been created successfully.");
				navigation.navigate("Success");
			} else if (res?.error) {
				showErrorMessage(res?.payload?.error);
			}
		});
	};

	return (
		
		<View style={style.socialIcons}>
			<TouchableOpacity style={style.appleIcon}>
				<Image source={loginScreen.appleStoreIcon} />
			</TouchableOpacity>
			<TouchableOpacity style={style.googleIcon}>
				<Image source={loginScreen.googleStoreIcon} />
			</TouchableOpacity>
			<TouchableOpacity style={style.facebookIcon} onPress={() =>
				Auth.federatedSignIn({
					provider: "LoginWithFacebook",
				})
			}>
				<Image source={loginScreen.facebookStoreIcon} />
			</TouchableOpacity>
		</View>
		
	);
};
export default SocialLogin;
