import React, { useEffect, useState, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Linking, AppState } from 'react-native';
import { Color } from '../theme/colors'; // Adjust the import path based on your project structure
import { Config } from '../config'; // Config should include playStoreUrl

export const UpdateScreen = ({ visible, onClose, appUrl }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      console.log('App state changed to:', nextAppState);

      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // Re-show modal when app comes back to the foreground
        setIsVisible(true);
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleUpdatePress = () => {
    const url = appUrl || Config.playStoreUrl; // Default URL if appUrl is empty
    Linking.openURL(url).catch(err =>
      console.error('Failed to open Play Store link:', err)
    );
    setIsVisible(false); // Hide modal when the user clicks "Update Now"
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Update Required</Text>
          <Text style={styles.modalMessage}>
            A new version of the app is available. Please update to continue using the app.
          </Text>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdatePress}
          >
            <Text style={styles.updateButtonText}>Update Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#555',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: Color.primaryBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
