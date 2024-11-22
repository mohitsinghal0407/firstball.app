import React, {useState} from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	Image,
} from "react-native";
import style from "./style";
import PushController from "../../../pushController";
import Container from "../../components/container";

import {dynamicSize} from "../../utils/helpers";

const PushNotifications = () => {
	let pushData = [
		{
			title: "First push",
			message: "First push message",
		},
		{
			title: "Second push",
			message: "Second push message",
		},
	];

	const itemList = ({item}) => {
		return (
			<View style={style.header} key={item.title}>
				<Text style={style.title}>{item.title}</Text>
				<Text style={style.title}>{item.message}</Text>
			</View>
		);
	};

	return (
		<Container fluid>
			<View style={{marginTop: dynamicSize(50, 1)}}>
				<FlatList
					data={pushData}
					renderItem={(item, index) => itemList(item, index)}
					keyExtractor={(item) => item.title}
				/>

				<PushController />
			</View>
		</Container>
	);
};
export default PushNotifications;
