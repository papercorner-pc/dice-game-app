import { SafeScreen } from '../../components/template';
import LinearGradient from 'react-native-linear-gradient';
import { Platform, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import gameIcon from '../../theme/assets/images/game.png';
import flagIcon from '../../theme/assets/images/flag.png';
import eyeIcon from '../../theme/assets/images/eye.png';
import { FontFamily } from '../../theme/fonts';
import CustomTextInput from '../../components/molecules/TextInput';
import { useEffect, useRef, useState } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ButtonComponent from '../../components/molecules/Button';
import { navigate, navigateAndSimpleReset } from '../../navigators/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../../services/auth/auth';
import {
  customToastMessage,
  validatePassword,
  validatePhone,
} from '../../utils/UtilityHelper';
import { storage } from '../../App';
import { Colors } from '../../theme/colors';

const SignIn = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const mutation = useMutation({
    mutationFn: payload => {
      return login(payload);
    },
    onSuccess: data => {
      console.log('---success', data);
      storage.set('auth_token', data.token);
      storage.set('user_type', data.type);
      // storage.set('userData',data.user)
      customToastMessage('Login success', 'success');
      if (data.is_admin) {
        storage.set('is_admin', true);
        navigateAndSimpleReset('AdminRoot');
      } else if (data.type === "agent") {
        storage.set('is_admin', false);
        navigateAndSimpleReset('AgentRoot');
      } else {
        storage.set('is_admin', false);
        navigateAndSimpleReset('HomeRoot');
      }
    },
    onError: error => {
      console.log('------ERRORq123-----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
  const onPressLogin = () => {
    var isValid = true;
    if (name === "") {
      isValid = false;
      customToastMessage('Please enter valid User Name', 'error');
    }
    if (password === '') {
      isValid = false;
      customToastMessage('Please enter Password', 'error');
    }
    if (isValid) {
      const fcm_token = storage.getString('fcm_token');
      const payload = {
        username: name,
        password: password,
        device_type: Platform.OS,
        device_token: !!fcm_token ? fcm_token : "",
        fcm_token: !!fcm_token ? fcm_token : "",
      };
      mutation.mutate(payload);
    }
  };
  return (
    <SafeScreen>
      <View style={{ flex: 1 }}>
        <View style={{ height: '40%' }}>
          <LinearGradient colors={['#412653', '#2E1B3B']} style={{ flex: 1 }}>
            <View
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <FastImage
                source={gameIcon}
                style={{
                  height: 150,
                  width: 150,
                }}
                resizeMode="contain"
              />
            </View>
          </LinearGradient>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            position: 'relative',
            top: -30,
            borderRadius: 40,
            padding: 10,
          }}>
          <View style={{ marginTop: 30, marginBottom: 15 }}>
            <Text
              style={{
                fontSize: 27,
                fontFamily: FontFamily.montserratSemiBold,
                color: '#070A0D',
              }}>
              Welcome Back!
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              fontFamily: FontFamily.poppinsRegular,
              color: '#0B1117',
            }}>
            Sign in to access your account and start playing
          </Text>
          <View style={{ marginVertical: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: FontFamily.montserratRegular,
                color: '#333333',
                marginBottom: 10,
              }}>
              User Name
            </Text>
            <TextInput
              placeholder={'Enter prefered user name'}
              onChangeText={setName}
              value={name}
              style={{
                padding: 10,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#C4BCCA',
                marginBottom: 10,
                paddingHorizontal: 10,
                width: '100%',
                color: Colors.black
              }}
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: FontFamily.montserratRegular,
                color: '#333333',
                marginBottom: 10,
              }}>
              Password
            </Text>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderRadius: 12,
                borderColor: '#C4BCCA',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                marginBottom: 10,
              }}>
              <TextInput
                ref={passwordRef}
                placeholder={'Enter password'}
                onChangeText={setPassword}
                value={password}
                style={{
                  padding: 10,
                  width: '90%',
                  color: Colors.black
                }}
                secureTextEntry={showPassword}
              />
            </View>
            {/* <View style={{ alignItems: 'flex-end', marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: FontFamily.montserratRegular,
                  color: '#333333',
                  marginBottom: 10,
                }}>
                Forgot Password?
              </Text>
            </View> */}
            <ButtonComponent
              buttonColor="#DC9C40"
              wrapperStyles={{
                marginBottom: 10,
              }}
              textStyles={{
                color: '#090D12',
                fontSize: 16,
                fontFamily: FontFamily.montserratRegular,
              }}
              text={'Login'}
              onPress={onPressLogin}
            />
            {/* <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#333333',
                  fontSize: 14,
                  fontFamily: FontFamily.montserratMedium,
                }}>
                Don’t have an account?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigate('CreateAccount');
                }}>
                <Text
                  style={{
                    color: '#7D447F',
                    fontSize: 14,
                    fontFamily: FontFamily.montserratMedium,
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </View>
    </SafeScreen>
  );
};

export default SignIn;
