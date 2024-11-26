import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import MatchList from "../screens/matchModule/matchList";
import MatchStream from "../screens/matchModule/matchStream";
import Splash from "../screens/splash";
import SignIn from "../screens/authModule/signIn";
import Processing from "../screens/processing";
import ChangePassword from "../screens/profileModule/changePassword";

const AuthStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

export const AuthScreen = () => (
	<AuthStack.Navigator
		initialRouteName="Splash"
		screenOptions={{
			animation: "slide_from_right",
			headerShown: false,
		}}
	>
		<AuthStack.Screen name="Splash" component={Splash} />
		<AuthStack.Screen name="SignIn" component={SignIn} />
		<AuthStack.Screen name="MatchList" component={MatchStack} />
		<AuthStack.Screen name="Processing" component={Processing} />
		<AuthStack.Screen name="ChangePassword" component={ChangePassword} />
	</AuthStack.Navigator>
);

export const MatchStack = () => (
	<Stack.Navigator
		initialRouteName="MatchListScreen"
		screenOptions={{
			animation: "slide_from_right",
			headerShown: false,
		}}
	>
		<AuthStack.Screen name="MatchListScreen" component={MatchList} />
		<AuthStack.Screen name="MatchStream" component={MatchStream} /> 
		<AuthStack.Screen name="ProcessSignIn" component={SignIn} />
		<AuthStack.Screen name="ChangePasswordScreen" component={ChangePassword} />
	</Stack.Navigator>
);
