import React, { useEffect, useState } from "react";
import {View, Text, Linking} from "react-native";
import {Color} from "../../../theme/colors";
import {CommonStyle} from "../../../theme/style";
import style from "./style";
import AppButton from "../../../components/appButton";
import MainContainer from "../../../components/mainContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VersionMisMatched = ({navigation}) => {
	const [app_download_url, setAppDownloadUrl] = useState('');

	const fetchDownloadUrl = async () => {
		const url = await AsyncStorage.getItem("app_download_url");
		setAppDownloadUrl(url);
	};

	useEffect(() => {
		fetchDownloadUrl();
	}, [app_download_url]);

	return (
		<MainContainer fluid>
			<View style={CommonStyle.headingStyleBar}>
				<View style={style.screenTitle}>
					<Text style={[CommonStyle.appHeading, {textAlign: "left"}]}>
						New version is come. Download new version
					</Text>
				</View>
			</View>
			<View style={CommonStyle.topSpacing}></View>
			<AppButton
				title={"Download"}
				onPress={() => Linking.openURL(app_download_url)}
			/>
		</MainContainer>
	);
};

export default VersionMisMatched;
