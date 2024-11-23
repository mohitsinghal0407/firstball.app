import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,TouchableOpacity, ActivityIndicator } from "react-native";
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
          padding: 16,
          borderRadius: 10,
          backgroundColor: "#E0F2FE",
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
        }}
      >
        <View style={{ flex: 1 }}>
          <Text 
            style={{ 
              fontSize: 14,
              fontWeight: '500',
              color: '#374151',
              marginRight: 4
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
        <ActivityIndicator size="large" color="#2563EB" />
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
            backgroundColor: "#E0F2FE",
            borderRadius: 10,
          }}
        >
          <Ionicons name="tv-outline" size={35} color="#2563EB" />
          <Text style={[CommonStyle.descText, { marginTop: 8, color: "#2563EB", fontSize: 16 }]}>
            No live matches at the moment
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#2563EB',
    },
    dateSection: {
        marginBottom: 20,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2563EB',
        textAlign: 'center',
        marginVertical: 10,
        borderBottomWidth: 2,
        borderColor: '#2563EB',
        paddingBottom: 5,
    },
    matchCard: {
        backgroundColor: '#E0F2FE',
        borderRadius: 10,
        padding: 16,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: '100%',
    },
    competitionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6D28D9',
        textAlign: 'center',
        marginBottom: 8,
    },
    teamContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 10,
    },
    teamDetails: {
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 8,
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginBottom: 4,
    },
    teamText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        textAlign: 'center',
        width: '100%',
        height: 40,
    },
    vsText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#4B5563',
        marginHorizontal: 8,
    },
    matchInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1D4ED8',
    },
    locationText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#6B7280',
    },
});

export default LiveMatchCard;
