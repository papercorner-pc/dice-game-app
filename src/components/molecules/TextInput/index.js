import { Colors } from "../../../theme/colors";
import React, { useRef, useState } from "react";
import { TextField } from "rn-material-ui-textfield";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import { useTheme } from "../../../theme";
import FastImage from "react-native-fast-image";
import searchIcon from "../../../theme/assets/images/search.png";

const CustomTextInput = ({
  secureTextEntry = false,
  valueField,
  errorField,
  placeholderName,
  onChangeTextValue,
  onChangeFocus,
  isPassword,
  maxLength = undefined,
  isEditable = true,
  multiLine = false,
  numberOfLines = 1,
  height = 50,
  prefixIcon = false,
  isCurrency = false,
  keyboardType = "default",
}) => {
  const ref = useRef(null);
  const { Images } = useTheme();
  const onChangeText = (text) => {
    onChangeTextValue(text);
  };
  const [secureTextEntryData, setSecureTextEntryData] =
    useState(secureTextEntry);
  const onFocus = () => {
    if (ref && ref.current.inputRef.current.isFocused()) {
      onChangeFocus();
    }
  };
  const renderModalRightAccessory = () => (
    <TouchableOpacity
      onPress={() => setSecureTextEntryData(!secureTextEntryData)}
    >
      <FontAwesomeIcon
        name={secureTextEntryData ? "eye-slash" : "eye"}
        size={18}
        color="#000000"
        style={{ marginRight: 15 }}
      />
    </TouchableOpacity>
  );

  const renderModalLeftAccessory = () => {
    return (
      <View style={{ alignSelf: "center", paddingLeft: 15 }}>
        <FastImage source={searchIcon} style={{ height: 22, width: 22 }} />
      </View>
    );
  };
  const renderModalLeftCurrencyAccessory = () => {
    return (
      <View
        style={{
          alignSelf: "center",
          paddingLeft: 15,
          marginTop: -5,
        }}
      >
        <Text style={styles.currencyCode}>KD</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TextField
        ref={ref}
        renderRightAccessory={isPassword ? renderModalRightAccessory : null}
        renderLeftAccessory={
          prefixIcon
            ? renderModalLeftAccessory
            : isCurrency
            ? renderModalLeftCurrencyAccessory
            : null
        }
        value={valueField}
        autoCorrect={false}
        enablesReturnKeyAutomatically={true}
        onFocus={onFocus}
        onChangeText={onChangeText}
        returnKeyType="next"
        style={[styles.textContainer]}
        inputContainerStyle={[
          styles.inputContainer,
          ,
          {
            backgroundColor: prefixIcon ? "#FAFAFA" : Colors.white,
            height: height,
            borderRadius: prefixIcon ? 10 : 5,
          },
        ]}
        textColor={Colors.black}
        placeholderTextColor={Colors.placeHolder}
        placeholder={placeholderName}
        passwordRules={
          "required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
        }
        secureTextEntry={secureTextEntryData}
        error={errorField}
        errorColor={Colors.offerRed}
        lineType="none"
        collapsable
        autoCapitalize="none"
        titleTextStyle={styles.errorStyle}
        multiline={multiLine}
        maxLength={maxLength}
        editable={isEditable}
        selectTextOnFocus={isEditable}
        numberOfLines={numberOfLines}
        textAlignVertical={multiLine ? "top" : "center"}
        keyboardType={keyboardType}
      />
    </View>
  );
};
export default CustomTextInput;
