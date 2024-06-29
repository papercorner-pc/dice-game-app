import { View } from "react-native";
import styles from "./styles";
import NotificationList from "../../../components/molecules/NotificationList";
import { SafeScreen } from "../../../components/template";
import HeaderComponent from "../../../components/molecules/Header";

const NotificationScreen = () => {
  return (
    <SafeScreen>
      <View style={styles.container}>
        <HeaderComponent title={"Notifications"} />
        <NotificationList />
      </View>
    </SafeScreen>
  );
};

export default NotificationScreen;
