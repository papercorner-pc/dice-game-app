import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Platform } from "react-native";
// import PushNotification, { Importance } from 'react-native-push-notification';
import notifee, {
  AndroidColor,
  AndroidImportance,
} from "@notifee/react-native";
import { navigate } from "../../../navigators/utils";
import { showNotification } from "../../../utils/notificationService";

const ShowNotificationForeground = (props) => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("remote message foreground in com", remoteMessage);
      const { data, messageId, notification } = remoteMessage;

      await showNotification(remoteMessage);
     // navigateNotification(data);
    });
    return unsubscribe;
  }, []);
  return null;
};

export default ShowNotificationForeground;
