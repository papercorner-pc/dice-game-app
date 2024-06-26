import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonComponent from '../../components/molecules/Button';
import CustomTextInput from '../../components/molecules/TextInput';
import { SafeScreen } from '../../components/template';
import { goBack, navigate, navigateAndSimpleReset } from '../../navigators/utils';
import { updatePassword } from '../../services/users/users';
import backIcon from '../../theme/assets/images/back.png';
import { FontFamily } from '../../theme/fonts';
import { customToastMessage, validatePassword } from '../../utils/UtilityHelper';

const UpdatePassword = props => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [errorCurrentPassword, setErrorCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const mutation = useMutation({
    mutationFn: payload => {
      return updatePassword(payload);
    },
    onSuccess: data => {
      console.log('---success updateProfile', data);
      customToastMessage('Passeord Updated', 'success');
      navigateAndSimpleReset('LoginRoot');
    },
    onError: error => {
      console.log('------ERROR updateProfile -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
  const onPressUpdate = () => {
    var isValid = true;
    if (currentPassword === '') {
      isValid = false;
      setErrorCurrentPassword("Please Enter Current Password")
    }
    if (!validatePassword(newPassword)) {
      isValid = false;
      setErrorNewPassword("Please Enter Valid New Password")
    }
    if (!validatePassword(confirmPassword)) {
      isValid = false;
      setErrorConfirmPassword("Please Enter Valid New Password")
    }
    if (newPassword !== confirmPassword) {
      isValid = false;
      setErrorConfirmPassword("New Password and Current Password is Different")
    }
    if (isValid) {
      const payload = {
        "current_password": currentPassword,
        "new_password": newPassword,
        "new_password_confirmation": confirmPassword
      };
      mutation.mutate(payload);
    }
  }
  return (
    <SafeScreen>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            goBack();
          }}>
          <Image
            style={{ height: 24, width: 24, marginRight: 24 }}
            source={backIcon}
            resizeMode="contain"
            tintColor={'#070A0D'}
          />
        </TouchableOpacity>
        <View style={styles.mainHeadingContainer}>
          <Text style={styles.headingText}>Update Password</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 15, paddingVertical: 8 }}>
          <Text style={styles.profileText}>Change Password</Text>
        </View>
        <View style={[styles.inputMainContainer, { marginBottom: 50 }]}>
          <Text style={styles.inputText}>Current Password</Text>
          <CustomTextInput
            placeholderName={'Current Password'}
            secureTextEntry={true}
            isPassword={true}
            valueField={currentPassword}
            onChangeTextValue={setCurrentPassword}
            onChangeFocus={() => {
              setErrorCurrentPassword('');
            }}
            errorField={errorCurrentPassword}
          />
          <Text style={styles.inputText}>New Password</Text>
          <CustomTextInput
            placeholderName={'Enter'}
            secureTextEntry={true}
            isPassword={true}
            valueField={newPassword}
            onChangeTextValue={setNewPassword}
            onChangeFocus={() => {
              setErrorNewPassword('');
            }}
            errorField={errorNewPassword}
          />
          <Text style={styles.inputText}>Confirm Password</Text>
          <CustomTextInput
            placeholderName={'Enter'}
            secureTextEntry={true}
            isPassword={true}
            valueField={confirmPassword}
            onChangeTextValue={setConfirmPassword}
            onChangeFocus={() => {
              setErrorConfirmPassword('');
            }}
            errorField={errorConfirmPassword}
          />
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <ButtonComponent
            buttonColor="#DC9C40"
            wrapperStyles={{
              marginBottom: 10,
            }}
            textStyles={{
              color: '#090D12',
              fontSize: 16,
              fontFamily: FontFamily.poppinsMedium,
            }}
            text={'Update'}
            onPress={() => {
              navigateAndSimpleReset('LoginRoot');
            }}
          />
        </View>
      </View>
    </SafeScreen>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  headerContainer: {
    height: 48,
    backgroundColor: '#FBFBFB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 15,
  },
  mainHeadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsMedium,
    color: '#070A0D',
  },
  container: {
    flex: 1,
    backgroundColor: '#EEEDED',
  },
  profileText: {
    fontSize: 13,
    fontFamily: FontFamily.poppinsMedium,
    color: '#333333',
  },
  inputMainContainer: {
    padding: 15,
    backgroundColor: '#FBFBFB',
  },
  inputText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
    color: '#333333',
  },
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#C4BCCA',
    marginVertical: 10,
  },
});
