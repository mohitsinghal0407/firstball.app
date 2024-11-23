import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CommonStyle } from "../../theme/style";
import { Color } from "../../theme/colors";
import axiosInstance from "../../apis";
import apiRoutes from "../../apis/apiRoutes";
import { showErrorMessage } from "../../utils/helpers";
import { useNavigation } from '@react-navigation/native';

const LiveMatchCard = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const getLiveMatches = async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.matches);
      if (response.data.success) {
        const live = response.data.matches.filter(
          (match) => match.status === "live"
        );
        setLiveMatches(live);
      } else {
        showErrorMessage(`Live Matches! ${response?.data?.message ? response.data.message : 'Something went wrong.'}`);
      }
    } catch (error) {
      showErrorMessage(`Live Matches! ${error?.message ? error.message : 'Something went wrong.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLiveMatches();
  }, []);

  const renderLiveMatch = (item) => (
    <TouchableOpacity
      key={item._id}
      style={[
        CommonStyle.card,
        {
          marginBottom: 4,
          padding: 8,
          borderRadius: 6,
          backgroundColor: "#F8FAFF",
          borderWidth: 1,
          borderColor: Color.primaryBlue + "20",
        },
      ]}
      onPress={() => navigation.navigate("MatchStream", { matchId: item._id })}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 2,
          paddingVertical: 2,
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: Color.primaryBlue + "10",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text 
            style={{ 
              color: Color.primaryBlue,
              fontSize: 14,
              fontWeight: "600",
              marginRight: 6
            }}
            numberOfLines={1}
          >
            {item.homeTeam} vs {item.awayTeam}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Color.primaryPink,
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: Color.white, fontWeight: "600", fontSize: 12 }}>
            Watch Now
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <ActivityIndicator size="large" color={Color.primaryBlue} />
      </View>
    );
  }

  return (
    <View>
      {liveMatches.length > 0 ? (
        liveMatches.map((match) => renderLiveMatch(match))
      ) : (
        <View
          style={{
            padding: 15,
            alignItems: "center",
            backgroundColor: Color.white,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Color.primaryBlue + "20",
          }}
        >
          <Ionicons name="tv-outline" size={35} color={Color.primaryBlue} />
          <Text style={[CommonStyle.descText, { marginTop: 8 }]}>
            No live matches at the moment
          </Text>
        </View>
      )}
    </View>
  );
};

export default LiveMatchCard;
