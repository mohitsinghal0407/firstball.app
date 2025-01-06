import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import Navigation from './src/routes/navigation';
import { initializePushNotifications, requestUserPermission } from './src/components/NotificationService'; // Import the notification service
import { Alert, Linking, AppState, BackHandler } from 'react-native';

export default function App() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionChecked, setPermissionChecked] = useState(false);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      console.log("App state changed to:", nextAppState);

      if (nextAppState === 'active' && !permissionChecked) {
        console.log("Checking notification permission when app comes to foreground...");
        setPermissionChecked(true); // Mark as checked to avoid multiple checks in this state change cycle

        const granted = await requestUserPermission();
        console.log("Permission granted:", granted);

        if (granted) {
          console.log("Initializing push notifications...");
          initializePushNotifications(); // Initialize push notifications if granted
          setPermissionGranted(true);
        } else {
          setPermissionGranted(false);
          Alert.alert(
            'Enable Notifications',
            'Please enable notification permissions in your device settings to continue using the app.',
            [
              { text: 'Settings', onPress: () => Linking.openSettings() },
              { text: 'OK', onPress: () => BackHandler.exitApp() }
            ],
            { cancelable: false }
          );
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Initial check when app launches
    handleAppStateChange('active');

    return () => {
      subscription.remove();
    };
  }, [permissionChecked]);

  if (!permissionGranted) {
    return null; // Render nothing if permission is not granted
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
