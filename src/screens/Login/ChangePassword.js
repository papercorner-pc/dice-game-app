import { SafeScreen } from "@/components/template";
import { Pressable, Text, View } from "react-native";
import CustomTextInput from "../../components/molecules/TextInput";
import { Colors } from "../../theme/colors";
import { FontFamily } from "../../theme/fonts";
import googleIcon from "@/theme/assets/images/google.png";
import FastImage from "react-native-fast-image";
import { navigate, navigateAndSimpleReset } from "../../navigators/utils";
import lockImage from "@/theme/assets/images/lockImage.png";
import styles from "./styles";
import HeaderComponent from "../../components/molecules/Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changePassword } from "../../services/auth/auth";
import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";
import { customToastMessage, validatePassword } from "../../utils/UtilityHelper";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [errorCurrentPassword, setErrorCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload) => {
      return changePassword(payload);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries("changePassword");
    },
    onError: (error) => {
      console.log("------ERRORq123-----", error.error);
      customToastMessage(error.error ? error.error : error.message, "danger");
    },
  });

  const onPressChange = () => {
    var isValid = true;
    if (!validatePassword(currentPassword)) {
      setErrorCurrentPassword("Please enter valid password");
      isValid = false;
    }
    if (!validatePassword(newPassword)) {
      setNewPassword("Please enter valid password");
      isValid = false;
    }
    if (!validatePassword(confirmPassword)) {
      setConfirmPassword("Please enter valid password");
      isValid = false;
    }
    if (newPassword !== confirmPassword) {
      setConfirmPassword("Please enter valid password");
      isValid = false;
    }
    if (isValid) {
      const payload = {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      };
      mutation.mutate(payload);
    }
  };

  useEffect(() => {
    console.log("value", mutation);
    if (mutation.isSuccess) {
      navigateAndSimpleReset("LoginRoot");
    }
  }, [mutation]);
  return (
    <SafeScreen>
      <HeaderComponent />
      <View style={styles.container}>
        <View style={styles.topImageContainer}>
          <FastImage
            style={styles.topImage}
            resizeMode="contain"
            source={lockImage}
          />
        </View>
        <Text style={styles.titleText}>Change Password?</Text>
        <Text style={[styles.subtitleText, { marginTop: 15 }]}>
          Create new password!
        </Text>
        <Text
          style={[styles.subtitleText, { marginTop: 15, marginBottom: 10 }]}
        >
          Current Password
        </Text>
        <CustomTextInput
          placeholderName={"Current Password"}
          secureTextEntry={true}
          isPassword={true}
          valueField={currentPassword}
          onChangeTextValue={setCurrentPassword}
          onChangeFocus={() => {
            setErrorCurrentPassword("");
          }}
          errorField={errorCurrentPassword}
        />
        <Text
          style={[styles.subtitleText, { marginTop: 15, marginBottom: 10 }]}
        >
          Password
        </Text>
        <CustomTextInput
          placeholderName={"Password"}
          secureTextEntry={true}
          isPassword={true}
          valueField={newPassword}
          onChangeTextValue={setNewPassword}
          onChangeFocus={() => {
            setErrorNewPassword("");
          }}
          errorField={errorNewPassword}
        />
        <Text
          style={[styles.subtitleText, { marginTop: 15, marginBottom: 10 }]}
        >
          Confirm Password
        </Text>
        <CustomTextInput
          placeholderName={"Confirm Password"}
          secureTextEntry={true}
          isPassword={true}
          valueField={confirmPassword}
          onChangeTextValue={setConfirmPassword}
          onChangeFocus={() => {
            setErrorConfirmPassword("");
          }}
          errorField={errorConfirmPassword}
        />
        <Pressable onPress={onPressChange} style={styles.createAccountButton}>
          <Text style={styles.buttonText}>Update</Text>
        </Pressable>
      </View>
    </SafeScreen>
  );
};

export default ChangePassword;
