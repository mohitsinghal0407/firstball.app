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

// Generate FCM Token
export async function getFCMToken() {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM Token:', fcmToken);
      // Subscribe to all users topic
      await messaging().subscribeToTopic('all_users');
      return fcmToken;
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
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
    const fcmToken = await getFCMToken();
    handleForegroundNotifications();
    handleBackgroundNotifications();
    handleAppOpenedFromNotification();
    return fcmToken;
  }

  return null;
}
