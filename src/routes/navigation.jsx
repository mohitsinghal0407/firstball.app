import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StatusBar} from "react-native";
import { AuthScreen } from ".";

export default function Navigation() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<StatusBar barStyle={'dark-content'} backgroundColor={'#fff'}/>
				<AuthScreen />
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
