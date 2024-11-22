import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {useEffect} from "react";
import Splash from "../screens/splash";
import SignIn from "../screens/authModule/signIn";
import UserProfile from "../screens/profileModule/userProfile";
import ErrorScreen from "../screens/authModule/errorScreen";
import Processing from "../screens/processing";
import MatchStream from "../screens/matchStream";


const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

export const AuthScreen = (props) => (
	<AuthStack.Navigator
		initialRouteName="Splash"
		screenOptions={{
			animation: "slide_from_right",
			headerShown: false,
		}}
	>
		<AuthStack.Screen name="Splash" component={Splash} />
		<AuthStack.Screen name="SignIn" component={SignIn} />
		<AuthStack.Screen name="ErrorScreen" component={ErrorScreen} />
		<AuthStack.Screen name="UserProfile" component={ProfileStack} />
		<AuthStack.Screen name="Processing" component={Processing} />
	</AuthStack.Navigator>
);

export const ProfileStack = () => (
	<Stack.Navigator
		initialRouteName="UserProfileScreen"
		screenOptions={{
			animation: "slide_from_right",
			headerShown: false,
		}}
	>
		<AuthStack.Screen name="UserProfileScreen" component={UserProfile} />
		<AuthStack.Screen name="MatchStream" component={MatchStream} /> 
		<AuthStack.Screen name="ProcessSignIn" component={SignIn} />
	</Stack.Navigator>
);


