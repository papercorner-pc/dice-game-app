import React, { useRef, useEffect, useState, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Styles from "./styles";
import { useTheme } from "../../../theme";
import backIcon from "../../../theme/assets/images/back.png";
import { goBack, navigate, navigateAndSimpleReset } from "../../../navigators/utils";
import FastImage from "react-native-fast-image";
import { Colors } from "../../../theme/colors";

const HeaderComponent = ({
  title,
  titleColor = Colors.black,
  showBack = true,
  showDate = false,
  date,
  backgroundColor = Colors.white,
  popBackHome = false
}) => {
  const { Images, layout } = useTheme();

  const onGoBack = () => {
    if (popBackHome) {
      navigateAndSimpleReset('HomeRoot')
    } else {
      goBack();
    }
  };
  return (
    <View style={[Styles.container, { backgroundColor: backgroundColor }]}>
      <View style={Styles.headerContainer}>
        {showBack ? (
          <TouchableOpacity style={Styles.backButton} onPress={onGoBack}>
            <FastImage
              style={[Styles.backIcon, layout.rotateArabic]}
              source={backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flex: 0.2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text></Text>
          </View>
        )}
        <View style={Styles.mainHeadingContainer}>
          <Text style={[Styles.mainHeading, { color: titleColor }]}>
            {title}
          </Text>
          {showDate && <Text style={[Styles.dateText]}>{date}</Text>}
        </View>
        <View style={{ flex: 0.1 }}>
          <Text></Text>
        </View>
      </View>
    </View>
  );
};
export default HeaderComponent;
