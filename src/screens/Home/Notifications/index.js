import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { FlatList, Text, View } from "react-native";
import HeaderComponent from "@/components/molecules/Header";
import EmptyComponent from "../../../components/molecules/EmptyComponent";
import { useTranslation } from "react-i18next";
import emptyNotification from "../../../theme/assets/images/notification.png";
import styles from "./styles";
import { Colors } from "../../../theme/colors";
import NotificationList from "../../../components/molecules/NotificationList";

const NotificationScreen = () => {
  const notificationsList = []
  const { gutters, layout } = useTheme();
  const { t } = useTranslation();
  const renderOrders = ({ item, index }) => {
    return (
      <View>
        
      </View>
    );
  };

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
