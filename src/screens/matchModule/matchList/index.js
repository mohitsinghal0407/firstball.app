import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import AppButton from "../../../components/appButton";
import MainContainer from "../../../components/mainContainer";
import { Color } from "../../../theme/colors";
import { CommonStyle } from "../../../theme/style";
import { dynamicSize, showErrorMessage } from "../../../utils/helpers";
import PopupCard from "../../../components/popupCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import Processing from "../../processing";
import axiosInstance from "../../../apis";
import apiRoutes from "../../../apis/apiRoutes";
import Ionicons from "react-native-vector-icons/Ionicons";
import style from "./style";

const MatchList = ({ navigation, route }) => {
  const [exitModal, setExitModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [liveMatches, setLiveMatches] = useState([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const logoutApp = async () => {
    setIsLoading(true);
    await AsyncStorage.clear().then(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "SignIn" }],
        })
      );
    });
  };

  const getLiveMatches = async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.matches);
      if (response.data.success) {
        const live = response.data.matches.filter(
          (match) => match.status === "live"
        );
        setLiveMatches(live);
      } else {
        showErrorMessage(`Live Matches! ${error?.message ? error.message : 'Something went wrong.'}`);
      }
    } catch (error) {
      showErrorMessage(`Live Matches! ${error?.message ? error.message : 'Something went wrong.'}`);
    }
  };

  const getUserInfo = async () => {
    const user_info = await AsyncStorage.getItem("user_info");
    setUserInfo(JSON.parse(user_info));
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await getLiveMatches();
    } catch (error) {
      showErrorMessage(`Matches Refresh! ${error?.message ? error.message : 'Something went wrong.'}`);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    getUserInfo();
    getLiveMatches();
  }, []);

  const renderLiveMatch = (item) => (
    <TouchableOpacity
      key={item._id}
      style={[
        CommonStyle.card,
        {
          marginBottom: 15,
          padding: 20,
          borderRadius: 12,
          backgroundColor: "#F8FAFF",
          borderWidth: 1,
          borderColor: Color.primaryBlue + "20",
        },
      ]}
      onPress={() => navigation.navigate("MatchStream", { matchId: item._id })}
    >
      <Text
        style={[
          CommonStyle.title,
          { color: Color.primaryBlue, fontSize: 18, marginBottom: 8 },
        ]}
      >
        {item.series}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 10,
          paddingVertical: 8,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: Color.primaryBlue + "10",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text 
            style={{ 
              color: Color.primaryBlue, 
              fontSize: 16, 
              fontWeight: "500",
              marginRight: 10
            }}
            numberOfLines={1}
          >
            {item.homeTeam} vs {item.awayTeam}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Color.primaryPink,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: Color.white, fontWeight: "600" }}>
            LIVE NOW
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="location-outline" size={16} color={Color.primaryBlue} />
          <Text style={{ marginLeft: 5, color: Color.primaryBlue }}>
            {item.venue}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="calendar-outline" size={16} color={Color.primaryBlue} />
          <Text style={{ marginLeft: 5, color: Color.primaryBlue }}>
            {new Date(item.startTime).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <MainContainer fluid>
        <ScrollView 
          contentContainerStyle={[
            CommonStyle.topSpacing,
            { paddingHorizontal: 15 }
          ]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Color.primaryBlue]}
              tintColor={Color.primaryBlue}
            />
          }
        >
          <Text
            style={[
              CommonStyle.title,
              {
                marginBottom: 20,
                fontSize: 24,
                color: Color.primaryBlue,
                textAlign: "center",
              },
            ]}
          >
            Live Matches
          </Text>

          {error && (
            <View
              style={{
                backgroundColor: Color.danger + "20",
                padding: 10,
                borderRadius: 8,
                marginBottom: 15,
              }}
            >
              <Text style={{ color: Color.danger, textAlign: "center" }}>
                {error}
              </Text>
            </View>
          )}

          {liveMatches.length > 0 ? (
            liveMatches.map((match) => renderLiveMatch(match))
          ) : (
            <View
              style={{
                padding: 20,
                alignItems: "center",
                backgroundColor: Color.white,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: Color.primaryBlue + "20",
              }}
            >
              <Ionicons name="tv-outline" size={40} color={Color.primaryBlue} />
              <Text style={[CommonStyle.descText, { marginTop: 10 }]}>
                No live matches at the moment
              </Text>
            </View>
          )}

          <View style={CommonStyle.topSpacing} />
        </ScrollView>
      </MainContainer>

      <View
        style={{
          backgroundColor: Color.white,
          borderTopWidth: 1,
          borderColor: Color.primaryBlue + "20",
        }}
      >
        <View
          style={[
            CommonStyle.headingStyleBar,
            {
              paddingBottom: dynamicSize(10, 1),
              paddingHorizontal: dynamicSize(12, 1),
            },
          ]}
        >
          <TouchableOpacity
            style={[
              CommonStyle.headingStyleBar,
              {
                backgroundColor: Color.white,
                padding: 10,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,
              },
            ]}
            onPress={() => setExitModal(!exitModal)}
          >
            <Ionicons
              name="power"
              size={30}
              color={Color.primaryBlue}
              style={{ alignSelf: "flex-end", top: 5 }}
            />
            <Text style={style.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <PopupCard
        modalContent={
          <View>
            <Text style={CommonStyle.modalTitle}>
              Are you sure you want to {"\n"}Log Out?
            </Text>
            <View style={CommonStyle.footer}>
              <View style={{ width: "45%" }}>
                <AppButton
                  title={"No"}
                  textStyle={{ color: Color.primaryBlue }}
                  bgStyle={{ backgroundColor: Color.placeholder }}
                  onPress={() => setExitModal(!exitModal)}
                />
              </View>
              <View style={{ width: "10%" }} />
              <View style={{ width: "45%" }}>
                <AppButton title={"Yes"} onPress={logoutApp} />
              </View>
            </View>
          </View>
        }
        modalVisible={exitModal}
        setModalVisible={() => setExitModal(!exitModal)}
      />
    </>
  );
};

export default MatchList;
