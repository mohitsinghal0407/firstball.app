import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CommonStyle } from "../../theme/style";
import { Color } from "../../theme/colors";
import axiosInstance from "../../apis";
import apiRoutes from "../../apis/apiRoutes";
import { showErrorMessage } from "../../utils/helpers";
import { useNavigation } from "@react-navigation/native";

const LiveMatchCard = () => {
  const [liveMatches, setLiveMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const fetchLiveMatches = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(apiRoutes.matches);
      if (response.data.success) {
        const live = response.data.matches.filter(
          (match) => match.status === "live"
        );
        setLiveMatches(live);
      } else {
        showErrorMessage(
          `Live Matches! ${response?.data?.message || "Something went wrong."}`
        );
      }
    } catch (error) {
      showErrorMessage(
        `Live Matches! ${error?.message || "Something went wrong."}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
  }, []);

  const renderLiveMatch = (match) => (
    <TouchableOpacity
      key={match._id}
      style={styles.matchCard}
      onPress={() => navigation.navigate("MatchStream", { matchId: match._id })}
    >
      <View style={styles.matchRow}>
        <Text style={styles.matchTitle}>
          {match.homeTeam} vs {match.awayTeam}
        </Text>
        <View style={styles.watchNowContainer}>
          <Text style={styles.watchNowText}>Watch Now</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Color.primaryBlue} />
      </View>
    );
  }

  if (liveMatches.length === 0) {
    return (
      <View style={styles.noMatchesContainer}>
        <Ionicons name="tv-outline" size={35} color={Color.primaryBlue} />
        <Text style={styles.noMatchesText}>No live matches at the moment</Text>
      </View>
    );
  }

  return <View>{liveMatches.map((match) => renderLiveMatch(match))}</View>;
};

const styles = StyleSheet.create({
  loaderContainer: {
    padding: 20,
    alignItems: "center",
  },
  noMatchesContainer: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#E0F2FE",
    borderRadius: 10,
  },
  noMatchesText: {
    marginTop: 8,
    color: Color.primaryBlue,
    fontSize: 16,
    textAlign: "center",
  },
  matchCard: {
    backgroundColor: "#E0F2FE",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
  },
  matchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  matchTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  watchNowContainer: {
    backgroundColor: Color.primaryPink,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  watchNowText: {
    color: Color.white,
    fontWeight: "600",
    fontSize: 12,
  },
});

export default LiveMatchCard;