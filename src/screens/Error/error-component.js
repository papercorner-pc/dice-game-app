import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import LottieView from "lottie-react-native";
import { ButtonComponent } from "../../components/molecules";

/**
 * Describe your component here
 */
export const ErrorComponent = ({ error, errorInfo, onReset, isConnected }) => {
  function renderLottie() {
    return (
      <LottieView
        source={require("../../theme/assets/json/noWifi.json")}
        autoPlay
        loop={false}
      />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <View style={styles.searchEmptyImageContainer}>{renderLottie()}</View>
        <Text style={styles.titleMessageText}>
          {!isConnected ? "Make sure your device is connected to the internet and try again" : error}
        </Text>
        <Text style={styles.friendlyMessageText}>
          {isConnected ? "" : "We cannot detect an internet connection"}
        </Text>
      </View>
      {/* <ButtonComponent onPress={onReset} text={"Retry"} /> */}
    </View>
  );
};
