import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color} from '../../theme/colors';
import axiosInstance from '../../apis';
import apiRoutes from '../../apis/apiRoutes';
import {showErrorMessage} from '../../utils/helpers';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = "ca-app-pub-5399334075306612~6842004890"
// const adUnitId = __DEV__
//   ? TestIds.REWARDED
//   : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

const LiveMatchCard = () => {
  const [loaded, setLoaded] = useState(false);
  const [liveMatches, setLiveMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMatchStreaming, setIsMatchStreaming] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  const fetchLiveMatches = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(apiRoutes.matches);
      if (response.data.success) {
        const live = response.data.matches.filter(
          match => match.status === 'live',
        );
        setLiveMatches(live);
      } else {
        showErrorMessage(
          `Live Matches! ${response?.data?.message || 'Something went wrong.'}`,
        );
      }
    } catch (error) {
      showErrorMessage(
        `Live Matches! ${error?.message || 'Something went wrong.'}`,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSettingInfo = async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.settings);
      await AsyncStorage.setItem(
        'setting_info',
        JSON.stringify(response.data.settingInfo[0]),
      );
      if (response.data.success) {
        const live = response.data.settingInfo[0].matchStreaming;
        setIsMatchStreaming(live);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchLiveMatches();
    fetchSettingInfo();
  }, []);

  const renderLiveMatch = match => (
    <TouchableOpacity
      key={match._id}
      style={styles.matchCard}
      onPress={
        isMatchStreaming
          ? () => {
              if (loaded) {
                rewarded.show();
              }
              navigation.navigate('MatchStream', {matchId: match._id});
            }
          : undefined
      }>
      <View style={styles.matchRow}>
        <Text style={styles.matchTitle}>
          {match.homeTeam.length > 15 || match.awayTeam.length > 15 ? (
            <>
              <Text style={styles.teamName}>{match.homeTeam}</Text>
              <Text style={styles.vsText}> vs </Text>
              <Text style={styles.teamName}>{match.awayTeam}</Text>
            </>
          ) : (
            `${match.homeTeam} vs ${match.awayTeam}`
          )}
        </Text>
        {isMatchStreaming && (
          <View style={styles.watchNowContainer}>
            <Text style={styles.watchNowText}>Watch Now</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const hdMatches = liveMatches.filter(match => match.type === 'hd');
  const fastMatches = liveMatches.filter(match => match.type === 'fast');

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

  return (
    <View>
      {fastMatches.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Live Fast match + bhaav + Session
          </Text>
          {fastMatches.map(match => renderLiveMatch(match))}
        </View>
      )}
      {hdMatches.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live Hd match + Commentary</Text>
          {hdMatches.map(match => renderLiveMatch(match))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noMatchesContainer: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    borderRadius: 10,
  },
  noMatchesText: {
    marginTop: 8,
    color: Color.primaryBlue,
    fontSize: 16,
    textAlign: 'center',
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
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  matchTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    flex: 1,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  vsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  watchNowContainer: {
    backgroundColor: Color.primaryPink,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  watchNowText: {
    color: Color.white,
    fontWeight: '600',
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Color.primaryBlue,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LiveMatchCard;
