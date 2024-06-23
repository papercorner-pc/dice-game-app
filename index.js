/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import messaging from "@react-native-firebase/messaging";
import { showNotification } from "./src/utils/notificationService";
import notifee from "@notifee/react-native";


messaging().setBackgroundMessageHandler(showNotification);
notifee.onBackgroundEvent(async ({ type, detail }) => {
  // Handle background notification events here
//   if (type === notifee.BackgroundEventType.NOTIFICATION_PRESS) {
//     // Handle notification press event
//     // Navigate to the desired screen, etc.
//     console.log("Notification pressed in the background:", detail.notification);
//   }
});
AppRegistry.registerComponent(appName, () => App);
