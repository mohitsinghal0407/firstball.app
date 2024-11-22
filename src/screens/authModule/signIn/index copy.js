import React, { useEffect, useState, useRef } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Modal,
	StyleSheet,
	Pressable,
	Platform,
	Linking,
	AppState
} from "react-native";
import BackArrow from "../../../components/backArrow";
import InputBox from "../../../components/inputBox";
import MainContainer from "../../../components/mainContainer";
import { Color } from "../../../theme/colors";
import { CommonStyle } from "../../../theme/style";
import {
	dynamicSize,
	showErrorMessage,
	showSuccessMessage,
} from "../../../utils/helpers";
import { loginScreen } from "../../../utils/resources";
import style from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import PasswordField from "../../../components/passwordField";
import AppButton from "../../../components/appButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cognitoPool } from "../../../utils/cognito-pool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { setUserFcmToken } from "../../../store/features/setTokenSlice";
import {
	CognitoIdentityClient,
	CreateIdentityPoolCommand,
	CognitoIdentity,
} from "@aws-sdk/client-cognito-identity";
import { requestUserPermission } from "../../../services/notification";
import Container from "../../../components/container";
import { Amplify, Auth, Hub } from "aws-amplify";
import config from "../../../aws-exports";
import SocialLogin from "../../../components/socialLogin";
import { createUser, loginUserService } from "../../../services/createUser";
import { loginUser } from "../../../store/features/loginSlice";
import { manageReveal } from "../../../store/features/revealSlice";
import Processing from "../../processing";
import moment from "moment";
import { CommonActions } from "@react-navigation/native";
import InAppBrowser from 'react-native-inappbrowser-reborn';


// Amplify.configure(config);

const SignIn = ({ navigation, route }) => {

	async function urlOpener(url, redirectUrl) {
		await InAppBrowser.isAvailable();
		const { type, url: newUrl } = await InAppBrowser.openAuth(url, redirectUrl, {
			showTitle: false,
			enableUrlBarHiding: true,
			enableDefaultShare: false,
			ephemeralWebSession: false,
		});
	
		if (type == 'success') {
			setfedratedLogin(true);
			setIsLoading(true);
			Linking.openURL(newUrl);
		}else{
			setfedratedLogin(false);
			setIsLoading(false);
		}

		console.log("type :",type)
	}
	
	Amplify.configure({
		...config,
		oauth: {
			...config.oauth,
			urlOpener,
		},
	});
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [goalType, setgoalType] = useState(null);

	const [isOpen, setIsOpen] = useState(false);
	const [accesstoken, setAccesstoken] = useState(null);
	const [socialManageState, setSocialManageState] = useState(0);
	const setGenderType = route?.params?.type;
	const setChildDateOfBirth = route?.params?.childDateOfBirth;
	const receiveDate = route?.params?.dateFormatSet;
	const firstDayCyclePlanSelect = route?.params?.firstDayCyclePlan;
	const previousBirthPlanSelect = route?.params?.previousBirthPlan;
	const selectDesiredGenderSelect = route?.params?.selectDesiredGender;
	const [isfedratedLogin, setfedratedLogin] = useState(false);
	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(appState.current);
	const timer = 0;
	let socialProcess = false;
	const getUserKey = async () => {
		let goal_type = await AsyncStorage.getItem("goal_type");
		await AsyncStorage.setItem("socialProcess", "false");
		let access_token = await AsyncStorage.getItem("access_token");
		// console.log("goal_type :", goal_type);
		setgoalType(goal_type);
		setAccesstoken(access_token);
		if (goal_type == "reveal") {
			createRevealCase();
		} else if (goal_type == "plan") {
			createPlanCase();
		} else {
			if (accesstoken) {
				navigation.dispatch(
					CommonActions.reset({
						index: 1,
						routes: [{ name: "UserProfile" }],
					})
				);
			}
		}
	};

	
	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			getAccessJwtToken();
			getUserKey();
			requestUserPermission();
		});

		return () => unsubscribe;
	}, [navigation]);

	const getAccessJwtToken = async () => {
		// Auth.currentSession() checks if token is expired and refreshes with Cognito if needed automatically
		const session = await Auth.currentSession();
		// console.log("session 21212:", session);
		if (session) {
			await AsyncStorage.setItem(
				"access_token",
				`Bearer ${session.getAccessToken().getJwtToken()}`
			);
			setIsLoading(false);
		}
	};

	const setUserToken = async (data) => {
		let token = await AsyncStorage.getItem("fcmToken");
		dispatch(
			setUserFcmToken({
				token: token,
			})
		).then((res) => { });
	};
	// const emailRegExp =
	// 	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	const onPressLogin = async (data) => {
		try {
			setIsLoading(true);
			// const user = await Auth.signIn(data.email, data.password);
			// console.log("Auth.signIn", user);
			// await AsyncStorage.setItem(
			// 	"access_token",
			// 	`Bearer ${user?.signInUserSession?.accessToken?.jwtToken}`
			// );
			console.log("dataBeforeCall", data);
			dispatch(loginUser({username: data.email, password: data.password, mode: 'mobile'})).then(async (userRes) => {

				console.log("userResAfter", userRes); return false;

				// if (userRes?.meta?.requestStatus == "fulfilled") {

				// 	setUserToken();
				// 	await AsyncStorage.setItem("user_info", JSON.stringify(userRes));
				// 	let postdata = await AsyncStorage.getItem("postdata");

				// 	if (postdata) {
				// 		if (goalType == "plan") {
				// 			navigation.dispatch(
				// 				CommonActions.reset({
				// 					index: 1,
				// 					routes: [{ name: "SelectPricing" }],
				// 				})
				// 			);
				// 		} else {
				// 			// console.log("postdata in else case", postdata);
				// 			dispatch(manageReveal(JSON.parse(postdata))).then((res) => {
				// 				// console.log("res", res);
				// 				setIsLoading(false);
				// 				if (res?.meta?.requestStatus == "fulfilled") {
				// 					showSuccessMessage("You have successfully created your Reveal.");
				// 					navigation.dispatch(
				// 						CommonActions.reset({
				// 							index: 1,
				// 							routes: [{ name: "PredictingResult" }],
				// 						})
				// 					);
				// 				} else {
				// 					showErrorMessage("Something went wrong.");
				// 				}
				// 			});
				// 		}
				// 	} else {
				// 		navigation.dispatch(
				// 			CommonActions.reset({
				// 				index: 1,
				// 				routes: [{ name: "UserProfile" }],
				// 			})
				// 		);
				// 	}
				// } else {
				// 	await createUser(user?.attributes, dispatch).then(async (res) => {
				// 		if (res.status) {
				// 			dispatch(loginUser()).then(async (userRes) => {
				// 				if (userRes?.meta?.requestStatus == "fulfilled") {

				// 					setUserToken();
				// 					await AsyncStorage.setItem("user_info", JSON.stringify(userRes));
				// 					let postdata = await AsyncStorage.getItem("postdata");

				// 					if (postdata) {
				// 						if (goalType == "plan") {
				// 							navigation.dispatch(
				// 								CommonActions.reset({
				// 									index: 1,
				// 									routes: [{ name: "SelectPricing" }],
				// 								})
				// 							);
				// 						} else {
				// 							// console.log("postdata in else case", postdata);
				// 							dispatch(manageReveal(JSON.parse(postdata))).then((res) => {
				// 								// console.log("res", res);
				// 								setIsLoading(false);
				// 								if (res?.meta?.requestStatus == "fulfilled") {
				// 									showSuccessMessage("You have successfully created your Reveal.");
				// 									navigation.dispatch(
				// 										CommonActions.reset({
				// 											index: 1,
				// 											routes: [{ name: "PredictingResult" }],
				// 										})
				// 									);
				// 								} else {
				// 									showErrorMessage("Something went wrong.");
				// 								}
				// 							});
				// 						}
				// 					} else {
				// 						navigation.dispatch(
				// 							CommonActions.reset({
				// 								index: 1,
				// 								routes: [{ name: "UserProfile" }],
				// 							})
				// 						);
				// 					}
				// 				} else {
				// 					showErrorMessage(userRes?.payload?.error);
				// 				}
				// 			})
				// 		} else {
				// 			showErrorMessage(res?.payload?.error);
				// 		}
				// 	})
				// }

			});
		} catch (err) {
			// console.log("authenticateUser  err:", err);
			setIsLoading(false);
			return false;
			switch (err.name) {
				case "UserNotConfirmedException":
					setIsOpen(!isOpen);
				case "NotAuthorizedException":
					setIsOpen(!isOpen);
				case "UserNotFoundException":
					setIsOpen(!isOpen);

					// navigation.navigate("ErrorScreen");

					showErrorMessage("Incorrect username or password.");
				default:
			}
		}
	};

	const createRevealCase = async () => {
		let access_token = await AsyncStorage.getItem("access_token");
		if (
			setChildDateOfBirth != undefined &&
			setGenderType != undefined &&
			receiveDate
		) {
			let data = {
				prevChildDateOfBirth: moment(setChildDateOfBirth).format("YYYY-MM-DD"),
				prevChildGender: setGenderType,
				dueDate: moment(receiveDate).format("YYYY-MM-DD"),
				paymentIntentId: "Free",
			};
			console.log("manageReveal  POST DATA:", JSON.stringify(data));
			await AsyncStorage.setItem("postdata", JSON.stringify(data));

			if (access_token != null) {
				setIsLoading(true);
				dispatch(manageReveal(data)).then(async (res) => {
					setIsLoading(false);
					if (res?.meta?.requestStatus == "fulfilled") {
						showSuccessMessage("You have successfully created your Reveal.");
						navigation.dispatch(
							CommonActions.reset({
								index: 1,
								routes: [{ name: "PredictingResult" }],
							})
						);
					} else {
						showSuccessMessage("Something went wrong.");
					}
				});
			}
		} else {
			if (access_token != null) {
				navigation.dispatch(
					CommonActions.reset({
						index: 1,
						routes: [{ name: "UserProfile" }],
					})
				);
			}
		}
	};

	const createPlanCase = async (type) => {
		let access_token = await AsyncStorage.getItem("access_token");
		// console.log("createPlanCase call");
		if (
			previousBirthPlanSelect != undefined &&
			setGenderType != undefined &&
			firstDayCyclePlanSelect != undefined &&
			selectDesiredGenderSelect != undefined
		) {
			let data = {
				prevChildDateOfBirth: moment(previousBirthPlanSelect).format(
					"YYYY-MM-DD"
				),
				prevChildGender: setGenderType,
				firstDayOfCycle: moment(firstDayCyclePlanSelect).format("YYYY-MM-DD"),
				preferredGender: selectDesiredGenderSelect,
				paymentIntentId: "Free",
			};
			await AsyncStorage.setItem("postdata", JSON.stringify(data));

			if (access_token != null) {
				setIsLoading(true);
				setTimeout(() => {
					navigation.dispatch(
						CommonActions.reset({
							index: 1,
							routes: [{ name: "SelectPricing" }],
						})
					);
				}, 1000);
			}
		} else {
			if (access_token != null) {
				navigation.dispatch(
					CommonActions.reset({
						index: 1,
						routes: [{ name: "UserProfile" }],
					})
				);
			}
		}
	};

	// const fedratedLogin = async (provider) => {
	// 	setSocialManageState(true);
	// 	setfedratedLogin(true);
	// 	setIsLoading(true);
	// 	socialProcess = true;
	// 	await AsyncStorage.setItem("socialProcess", "true");
	// 	Auth.federatedSignIn({
	// 		provider: provider,
	// 	});
	// };

	const getUser = async () => {
		return Auth.currentAuthenticatedUser()
			.then((userData) => userData)
			.catch(() => console.log("Not signed in"));
	};
	const verifySoicalLogin = async (userData) => {
		console.log("userData", userData);
		setSocialManageState(false);
		socialProcess = false;
		await AsyncStorage.setItem("socialProcess", "false");
		await AsyncStorage.setItem(
			"access_token",
			`Bearer ${userData?.signInUserSession?.accessToken?.jwtToken}`
		);
		await createUser(userData?.attributes, dispatch).then((res) => {
			if (res.status) {
				dispatch(loginUser()).then(async (userRes) => {
					console.log("userRes", userRes);
					await AsyncStorage.setItem("user_info", JSON.stringify(userRes));
					setUserToken();
					setfedratedLogin(false);
					setIsLoading(false);
					let postdata = await AsyncStorage.getItem("postdata");
					let goal_type = await AsyncStorage.getItem("goal_type");
					if (postdata) {
						if (goal_type == "plan") {
							navigation.dispatch(
								CommonActions.reset({
									index: 1,
									routes: [{ name: "SelectPricing" }],
								})
							);
						} else {
							setIsLoading(true);
							dispatch(manageReveal(JSON.parse(postdata))).then((res) => {
								setIsLoading(false);
								if (res?.meta?.requestStatus == "fulfilled") {
									showSuccessMessage(
										"You have successfully created your Reveal."
									);
									navigation.dispatch(
										CommonActions.reset({
											index: 1,
											routes: [{ name: "PredictingResult" }],
										})
									);
								} else {
								}
							});
						}
					} else {
						console.log("aaaaaa");
						navigation.dispatch(
							CommonActions.reset({
								index: 1,
								routes: [{ name: "UserProfile" }],
							})
						);
					}
				});
			}
		});
	};

	// useEffect(() => {
	// 	Hub.listen("auth", ({ payload: { event, data } }) => {
	// 		switch (event) {
	// 			case "signIn":
	// 			case "cognitoHostedUI":
	// 				getUser().then(async (userData) => {
	// 					setfedratedLogin(true);
	// 					setIsLoading(true);
	// 					let socialProcess1 = await AsyncStorage.getItem("socialProcess");
	// 					console.log("agya social ch", socialProcess1);
	// 					if (socialProcess1 === "true") {
	// 						await verifySoicalLogin(userData);
	// 					}
	// 				});
	// 				break;
	// 			case "signOut":
	// 				// setUser(null);
	// 				break;
	// 			case "signIn_failure":
	// 			case "parsingCallbackUrl":
	// 				if (data.url == null) {
	// 					setfedratedLogin(false);
	// 					setIsLoading(false);
	// 				}

	// 			case "cognitoHostedUI_failure":
	// 				console.log("Sign in failure", data);
	// 				break;
	// 		}
	// 	});
	// 	// getUser().then(userData => console.log("Userssresrers", userData));
	// }, []);


	useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                // if (nextAppState == 'active') {
                //     setfedratedLogin(false);
                //     setIsLoading(false);
                // }
                Hub.listen("auth", ({ payload: { event, data } }) => {
                    
                    switch (event) {
                        case "signIn":
                        case "cognitoHostedUI":
                            getUser().then(async (userData) => {
                                setfedratedLogin(true);
                                setIsLoading(true);
                                let socialProcess1 = await AsyncStorage.getItem("socialProcess");
                              
                                if (socialProcess1 === "true") {
                                    await verifySoicalLogin(userData);
                                }
                            });
                            break;
                        case "signOut":
                            // setUser(null);
                            break;
                        case "signIn_failure":
                        case "parsingCallbackUrl":
                            if (data.url == null) {
                                setfedratedLogin(false);
                                setIsLoading(false);
                            }
                        case "cognitoHostedUI_failure":
                            if (data.url == null) {
                                setfedratedLogin(false);
                                setIsLoading(false);
                            }

                            break;
                    }
                });
            }

            appState.current = nextAppState;
            setAppStateVisible(appState.current);
          
        });

        return () => {
            subscription.remove();
        };
    }, []);

	return (
		<>
			{!isOpen && (
				<>
					{!isLoading && accesstoken == null && !isfedratedLogin && (
						<MainContainer fluid>
							{/* <BackArrow
								navigation={navigation}
								colorChange={Color.primaryBlue}
							/> */}
							<View style={style.lockIcon}>
								<Image source={loginScreen.lockIcon} />
								<Text
									style={[
										CommonStyle.appHeading,
										{ fontSize: dynamicSize(30), marginTop: dynamicSize(10, 1) },
									]}
								>
									Sign in
								</Text>
							</View>
							<Formik
								initialValues={{
									email: "",
									password: "",
								}}
								onSubmit={(values) => onPressLogin(values)}
								validationSchema={Yup.object().shape({
									email: Yup.string()
										.required("invalid email"),
										// .matches(emailRegExp, "invalid email"),
									password: Yup.string().required("invalid password"),
								})}
							>
								{({
									values,
									handleChange,
									errors,
									setFieldTouched,
									setFieldValue,
									touched,
									isValid,
									dirty,
									handleSubmit,
								}) => (
									<>
										<View style={{ paddingHorizontal: dynamicSize(5, 1) }}>
											<View>
												<View>
													{touched.email && errors.email && (
														<Text style={CommonStyle.errorMsg}>
															{errors.email}
														</Text>
													)}
												</View>
												<InputBox
													placeholder={"username"}
													changeBorderColor={{
														borderColor:
															touched.email && errors.email
																? Color.primaryPink
																: null,
														borderWidth:
															touched.email && errors.email ? 1 : null,
														marginTop:
															touched.email && errors.email
																? dynamicSize(0)
																: dynamicSize(20, 1),
													}}
													value={values.email}
													onChangeText={handleChange("email")}
													onBlur={() => setFieldTouched("email")}
													keyboardType={"email-address"}
													showIcon={
														<Ionicons
															name="person-outline" 
															size={20}
															color={Color.primaryBlue}
														/>
													}
												/>
											</View>
											{touched.password && errors.password && (
												<Text style={CommonStyle.errorMsg}>
													{errors.password}
												</Text>
											)}
											<PasswordField
												placeholder={"***************"}
												value={values.password}
												onChangeText={handleChange("password")}
												onBlur={() => setFieldTouched("password")}
												changeBorderColor={{
													borderColor:
														touched.password && errors.password
															? Color.primaryPink
															: null,
													borderWidth:
														touched.password && errors.password ? 1 : null,
													marginTop:
														touched.password && errors.password
															? dynamicSize(0)
															: dynamicSize(20, 1),
												}}
											/>
											{/* <View style={{ marginTop: 10 }}>
												<TouchableOpacity
													onPress={() => navigation.navigate("ForgotPassword")}
												>
													<Text style={[
														CommonStyle.descText,
														{ color: Color.primaryBlue, textAlign: 'left' },
													]}>Forgot password?</Text>
												</TouchableOpacity>
											</View> */}

											<View style={CommonStyle.topSpacing}></View>
											<AppButton
												title={"Get Started"}
												onPress={handleSubmit}
												isLoading={isLoading}
											// onPress={() => navigation.navigate("Success", { planType })}
											/>

											{/* <Text
												style={[
													CommonStyle.descText,
													{ color: Color.primaryBlue },
												]}
											>
												Sign in with:
											</Text>

											<View style={style.socialIcons}>
												{Platform?.OS == "ios" && (
													<TouchableOpacity
														style={style.appleIcon}
														onPress={() => fedratedLogin("SignInWithApple")}
													>
														<Image source={loginScreen.appleStoreIcon} />
													</TouchableOpacity>
												)}

												<TouchableOpacity
													style={style.googleIcon}
													onPress={() => fedratedLogin("LoginWithGoogle")}
												>
													<Image source={loginScreen.googleStoreIcon} />
												</TouchableOpacity>
												<TouchableOpacity
													style={style.facebookIcon}
													onPress={() => fedratedLogin("LoginWithFacebook")}
												>
													<Image source={loginScreen.facebookStoreIcon} />
												</TouchableOpacity>
											</View>

											<TouchableOpacity
												style={{ marginTop: dynamicSize(10, 1) }}
												onPress={() => navigation.navigate("SignUp")}
											>
												<Text style={CommonStyle.linkText}>
													I don't have an account yet
												</Text>
											</TouchableOpacity> */}
										</View>
									</>
								)}
							</Formik>
						</MainContainer>
					)}
				</>
			)}

			{(isLoading || isfedratedLogin) && <Processing />}

			{isOpen && (
				<Container fluid containerStyle={{ alignItems: "center" }}>
					<View style={style.closeIcon}>
						<Ionicons
							name="close"
							size={40}
							style={{ alignSelf: "center" }}
							color={Color.primaryPink}
						/>
					</View>
					<Text style={[CommonStyle.appHeading, { fontSize: dynamicSize(35) }]}>
						Please check your {"\n"} login details
					</Text>
					<Text style={CommonStyle.descText}>
						It seems like your username or {"\n"} password is incorrect
					</Text>
					<AppButton title={"Try again"} onPress={() => setIsOpen(!isOpen)} />
					{/* </Animatable.View> */}
				</Container>
			)}
		</>
	);
};
export default SignIn;

const styles = StyleSheet.create({
	closeIcon: {
		backgroundColor: "red",
		alignSelf: "center",
		backgroundColor: "#FFDEE7",
		borderRadius: 50,
		padding: dynamicSize(5, 1),
		marginBottom: dynamicSize(10, 1),
	},
});
