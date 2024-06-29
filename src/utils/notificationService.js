import { PermissionsAndroid, Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { PERMISSIONS } from "react-native-permissions";
import { storage } from "../App";
import notifee, { AndroidColor, AndroidImportance } from "@notifee/react-native";
import { navigate } from "../navigators/utils";
import useModalStore from "../store/store"

export async function requestUserPermission(callback = () => { }) {
  if (Platform.OS === "ios") {
    registerForRemoteMessages();
  }
  if (Platform.Version >= 33) {
    try {
      const granted = await PermissionsAndroid.request(
        PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        {
          title: "Notification Permission",
          message: "Allow this app to post notifications?",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getFcmToken();
        callback(false);
      } else {
        callback(true);
      }
    } catch (err) {
      console.warn(err);
    }
  } else {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken();
      callback(false);
    } else callback(true);
  }
}

const registerForRemoteMessages = () => {
  messaging()
    .registerDeviceForRemoteMessages()
    .then(() => {
      console.log("Registered");
      requestPermissions();
    })
    .catch((e) => console.log(e));
};
const requestPermissions = () => {
  messaging()
    .requestPermission()
    .then((status) => {
      if (status === 1) {
        onMessage();
      } else {
      }
    })
    .catch((e) => console.log(e));
};

const onMessage = () => {
  messaging().onMessage((response) => {
    console.log("messaging response", response);
    showNotification(response);
  });
};
export const showNotification = async (response) => {
  console.log("res", typeof response);
  console.log("res----", response);
  if (Platform.OS === "android") {
    const { title, body } = response.notification;
    console.log("----body--, title", response.title, response.body);
    if (title && body) {
      const channelId = await notifee.createChannel({
        id: "default",
        name: "dicedash",
        vibration: true,
        lightColor: AndroidColor.YELLOW,
        sound: 'notification',
        importance: AndroidImportance.HIGH,
      });
      console.log("----body--, title", title, body, channelId);
      notifee.displayNotification({
        title: title,
        body: body,
        android: {
          sound: 'notification',
          channelId: channelId,
          pressAction: {
            id: 'default',
          },
          importance: AndroidImportance.HIGH,

        },
      });
      console.log("notififition data ------", response.data);
      console.log("game type check===", response.data?.game_type == "game_published");
      if (response.data?.game_type == "game_published") {
        console.log("game published");
        const modalReq = {
          title: title,
          body: body,
          gameId: response.data?.game_id,
        }
        useModalStore.getState().updateModalData(true, modalReq)
      }
    }
    getDeliveredNotificationAndroid(response);
    getReadDeliveredNotification((result) => {
      // setShowBadge(result.badgeValue)
    });
  } else {
    const { title, body } = response.notification;
    if (title && body) {
      notifee.displayNotification({
        title: title,
        body: body,
      });
    }
    const notification = {
      ...response,
    };
    getDeliveredNotificationAndroid(notification);
  }
};

const navigateNotification = async (notificationData) => {
  console.log("data noti", notificationData);
  console.log("data notify", notificationData.notificationType);
  switch (notificationData.notificationType) {
    case "other":
      navigate("Notification");
    default:
      navigate("Notification");
      break;
  }
};

const getFcmToken = async () => {
  let fcmToken = storage.getString("fcm_token");
  console.log("the old token", fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, "the new genrated token");
        // user has a device token
        storage.set("fcm_token", fcmToken);
      }
    } catch (error) {
      console.log(error, "error in fcmToken");
      // showError(error.message)
    }
  }
  // onMessage();
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(async (remoteMessage) => {
    const notificationData = remoteMessage.data;
    // navigateNotification(notificationData);
  });
  //Kill or inactive
  messaging()
    .getInitialNotification()
    .then(async (remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "notification app to open from quite state:",
          remoteMessage.notification
        );
      }
    });
};

export function getDeliveredNotification(callback) {
  notifee.getInitialNotification((notification) => {
    const updatedList = notification.map((notificationItem) => {
      const updatePushNotification = {
        ...notificationItem,
        messageId: notificationItem.userInfo["messageId"],
        isRead: false,
      };
      return updatePushNotification;
    });
    console.log("updated", updatedList.length);
    if (updatedList.length > 0) {
      const sortNotification =
        updatedList.length > 0
          ? updatedList.sort((a, b) => (a.date > b.date ? 1 : -1))
          : [];
      storePushNotification(sortNotification, (result) => {
        callback(result);
      });
    }
  });
}

export const storePushNotification = async (remoteMessage, callback) => {
  let itemArray = [];
  const getRemoteNotification = storage.getString("push_notification");

  remoteMessage.map?.(async (message) => {
    if (getRemoteNotification != null) {
      const getRemoteNotificationParse = JSON.parse(getRemoteNotification);
      const remoteNotificationSaved =
        getRemoteNotificationParse != null
          ? getRemoteNotificationParse.sort((a, b) =>
            a.date > b.date ? 1 : -1
          )
          : null;

      itemArray = [...remoteNotificationSaved];
      if (itemArray.find((item) => item.messageId === message.messageId)) {
        const findIndex = itemArray.findIndex(
          (itemValue) => itemValue.messageId === message.messageId
        );
        const updateRemoteNotification = {
          ...message,
          isRead: itemArray[findIndex].isRead,
        };
        itemArray[findIndex] = updateRemoteNotification;
      } else {
        itemArray.push(message);
      }
      const filterValue = getUnique(itemArray, "messageId");
      storage.set("push_notification", JSON.stringify(filterValue));
    } else {
      itemArray.push(message);
      storage.set("push_notification", JSON.stringify(itemArray));
    }
  });
  callback({ success: true });
};

export async function getReadDeliveredNotification(callback = () => { }) {
  const notification = storage.getString("push_notification");
  if (notification != null) {
    const getRemoteNotificationParse = JSON.parse(notification);
    const showBadgeIcon = getRemoteNotificationParse.every?.(
      (item) => item.isRead === true
    );
    if (showBadgeIcon) {
      callback({ badgeValue: false });
    } else {
      callback({ badgeValue: true });
    }
  } else {
    callback({ badgeValue: false });
  }
}
export const getDeliveredNotificationAndroid = async (notification) => {
  const updatePushNotification = {
    ...notification,
    userInfo: notification.data,
    messageId: notification.messageId,
    isRead: false,
  };
  let itemArray = [];
  const getRemoteNotification = storage.getString("push_notification");
  if (getRemoteNotification != null) {
    const getRemoteNotificationParse = JSON.parse(getRemoteNotification);
    itemArray = [...getRemoteNotificationParse];
    itemArray.push(updatePushNotification);
    const filterValue = getUnique(itemArray, "messageId");
    storage.set("push_notification", JSON.stringify(filterValue));
  } else {
    itemArray.push(updatePushNotification);
    storage.set("push_notification", JSON.stringify(itemArray));
  }
};

export function getUnique(array, key) {
  if (typeof key !== "function") {
    const property = key;
    key = function (item) {
      return item[property];
    };
  }
  return Array.from(
    array
      .reduce(function (map, item) {
        const k = key(item);
        if (!map.has(k)) map.set(k, item);
        return map;
      }, new Map())
      .values()
  );
}
