import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Button, Dimensions, StatusBar } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { LiveKitRoom, useTracks, VideoTrack, isTrackReference } from '@livekit/react-native';
import { Track } from 'livekit-client';
import BackArrow from '../../components/backArrow';
import axiosInstance from '../../apis';
import apiRoutes from '../../apis/apiRoutes';
import { Color } from '../../theme/colors';

const livekitServerUrl = 'wss://firstball-ge9m4mmg.livekit.cloud';

const MatchStream = ({ route, navigation }) => {
  const { matchId } = route.params;
  const [token, setToken] = useState(null);
  const [match, setMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [roomInstance, setRoomInstance] = useState(null);

  // Lock to landscape and hide status bar on mount
  useEffect(() => {
    StatusBar.setHidden(true);
    Orientation.lockToLandscape();

    return () => {
      StatusBar.setHidden(false);
      Orientation.unlockAllOrientations();
    };
  }, []);

  // Fetch match and token
  useEffect(() => {
    const fetchMatchAndToken = async () => {
      try {
        setIsLoading(true);
        const { data: streamData } = await axiosInstance.get(`${apiRoutes.matchStream}/${matchId}`);
        setToken(streamData.stream);

        const { data: matchData } = await axiosInstance.get(`${apiRoutes.matchDetails}/${matchId}`);
        setMatch(matchData.match);
      } catch (error) {
        console.error('Error fetching match or stream data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatchAndToken();
  }, [matchId]);

  // Handle LiveKit connection
  const handleConnected = (room) => {
    setIsConnected(true);
    setRoomInstance(room);
    console.log('Connected to LiveKit server', room);
  };

  const handleDisconnected = () => {
    setIsConnected(false);
    setRoomInstance(null);
    console.log('Disconnected from LiveKit server');
  };

  // Toggle audio mute/unmute
  const toggleAudioMute = () => {
    if (roomInstance?.localParticipant) {
      const isCurrentlyMuted = !isAudioMuted;
      roomInstance.localParticipant.setMicrophoneEnabled(isCurrentlyMuted);
      setIsAudioMuted(isCurrentlyMuted);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!token || !match) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load stream</Text>
      </View>
    );
  }

  return (
    <View style={styles.fullScreenContainer}>
      <LiveKitRoom
        serverUrl={livekitServerUrl}
        token={token}
        connect={true}
        options={{
          adaptiveStream: true,
          dynacast: true,
          publishDefaults: {
            simulcast: true,
            videoCodec: 'h264',
          },
          videoCaptureDefaults: {
            resolution: { width: 1920, height: 1080 },
          },
        }}
        onConnected={handleConnected}
        onDisconnected={handleDisconnected}
      >
        <View style={styles.headerOverlay}>
          <BackArrow navigation={navigation} colorChange="rgba(255,255,255,0.7)" />
        </View>
        
        <RoomView isConnected={isConnected} />
        
        <View style={styles.muteButtonContainer}>
          <Button
            title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
            onPress={toggleAudioMute}
            color={Color.primaryBlue}
          />
        </View>
      </LiveKitRoom>
    </View>
  );
};

// RoomView component (same as before)
const RoomView = ({ isConnected }) => {
  const tracks = useTracks([
    { source: Track.Source.Camera },
    { source: Track.Source.ScreenShare },
    { source: Track.Source.Microphone },
  ]);

  const renderTrack = ({ item }) => {
    if (isTrackReference(item) && (item.publication?.kind === 'video' || item.source === Track.Source.ScreenShare)) {
      return (
        <View style={styles.videoContainer}>
          <VideoTrack 
            trackRef={item} 
            style={styles.fullscreenVideo}
            objectFit="cover"
          />
        </View>
      );
    }
    return null;
  };

  if (!isConnected) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Connecting to stream...</Text>
      </View>
    );
  }

  if (tracks.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Waiting for video stream...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        renderItem={renderTrack}
        keyExtractor={(item, index) => `${item?.participant?.identity}-${index}`}
        contentContainerStyle={styles.flatListContainer}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 5,
    zIndex: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fullscreenVideo: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  muteButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 2,
  },
});
export default MatchStream;
