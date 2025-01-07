import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions';

// Request Notification Permission
export async function requestUserPermission() {
  const status = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

  if (status === RESULTS.GRANTED) {
    return true;
  } else if (status === RESULTS.DENIED || status === RESULTS.BLOCKED) {
    const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    return result === RESULTS.GRANTED;
  }
  return false;
}

// Create Notification Channel
export function createNotificationChannel() {
  PushNotification.createChannel(
    {
      channelId: 'default',
      channelName: 'Default Channel',
      channelDescription: 'A channel for general notifications',
      importance: PushNotification.Importance.HIGH,
      vibrate: true,
    },
    (created) => console.log(`Channel creation status: ${created}`)
  );
}

// Handle Notifications
export function handleForegroundNotifications() {
  return messaging().onMessage(async (remoteMessage) => {
    PushNotification.localNotification({
      channelId: 'default',
      title: remoteMessage.notification?.title,
      message: remoteMessage.notification?.body,
    });
  });
}

export function handleBackgroundNotifications() {
  return messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Background notification received:', remoteMessage);
  });
}

export function handleAppOpenedFromNotification() {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log('Notification opened from background:', remoteMessage.notification);
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log('App opened from a notification:', remoteMessage.notification);
      }
    });
}

// Initialize Push Notifications
export async function initializePushNotifications() {
  const permissionGranted = await requestUserPermission();

  if (permissionGranted) {
    createNotificationChannel();
    handleForegroundNotifications();
    handleBackgroundNotifications();
    handleAppOpenedFromNotification();
    return true;
  }

  return false;
}
