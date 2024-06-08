import {Pressable, StyleSheet, Text, View} from 'react-native';
import clockIcon from '../../theme/assets/images/clock.png';
import FastImage from 'react-native-fast-image';
import {FontFamily} from '../../theme/fonts';
import {Colors} from '../../theme/colors';
import OTPTextView from 'react-native-otp-textinput';
import {navigate, navigateAndSimpleReset} from '../../navigators/utils';
import {useEffect, useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {MMKV} from 'react-native-mmkv';
import {customToastMessage} from '../../utils/UtilityHelper';
import {SafeScreen} from '../../components/template';
import HeaderComponent from '../../components/molecules/Header';
import ButtonComponent from '../../components/molecules/Button';
import {otpVerify} from '../../services/auth/auth';

const OtpVerify = props => {
  const {phone} = props.route.params;
  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let timer;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds]);
  const onPressResend = () => {
    setSeconds(60);
    setIsRunning(true);
  };
  const navigateToVerified = () => {
    navigateAndSimpleReset('OtpVerified');
  };
  const mutation = useMutation({
    mutationFn: payload => {
      return otpVerify(payload);
    },
    onSuccess: data => {
      console.log('---success', data);
      customToastMessage('Otp Verified', 'success');
      navigateToVerified();
      // queryClient.invalidateQueries("movies");
    },
    onError: error => {
      console.log('------ERRORq123-----', error);
      customToastMessage(error.error ? error.error : error.message, 'danger');
    },
  });
  const onPressVerify = () => {
    var isValid = true;
    if (otp === '') {
      isValid = false;
      customToastMessage('Please enter Otp', 'danger');
    }
    if (isValid) {
      // const fcm_token = storage.getString('fcm_token');
      const payload = {
        phone_number: phone,
        otp: otp,
      };
      mutation.mutate(payload);
    }
  };
  return (
    <SafeScreen>
      <HeaderComponent />
      <View style={styles.container}>
        <Text style={[styles.titleText, {marginTop: 15}]}>
          Verify Your Account
        </Text>
        <Text style={[styles.subtitleText, {marginTop: 15}]}>
          We've sent a one-time password (OTP) to your registered mobile number.
        </Text>
        <View style={{marginTop: 20}}>
          <OTPTextView
            containerStyle={{marginBottom: 10}}
            textInputStyle={styles.otpInputContainer}
            tintColor={Colors.textInputColor}
            inputCount={6}
            handleTextChange={e => {
              setOtp(e);
            }}
            // defaultValue="1234"
          />
        </View>
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
          text={'Continue'}
          onPress={onPressVerify}
        />
        <View
          style={{
            marginTop: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Text style={styles.alreadyAccountText}>
                Didn't receive any code?
              </Text>
            </View>
            <Pressable style={{paddingTop: 5}} onPress={onPressResend}>
              <Text style={styles.alreadyAccountTextThemeColor}>
                Resend Code
              </Text>
            </Pressable>
          </View>
          <View style={{flexDirection: 'row'}}>
            <FastImage
              source={clockIcon}
              style={{
                height: 19,
                width: 19,
                marginHorizontal: 5,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 14,
                fontFamily: FontFamily.montserratMedium,
                color: '#101820',
              }}>
              {seconds}s
            </Text>
          </View>
        </View>
      </View>
    </SafeScreen>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  titleText: {
    fontSize: 22,
    fontFamily: FontFamily.montserratSemiBold,
    color: '#070A0D',
  },
  subtitleText: {
    fontSize: 14,
    fontFamily: FontFamily.montserratMedium,
    color: Colors.black,
  },
  otpInputContainer: {
    borderRadius: 4,
    borderWidth: 1,
    height: 45,
    width: 45,
    borderColor: '#C4BCCA',
  },
  alreadyAccountText: {
    fontSize: 14,
    fontFamily: FontFamily.montserratMedium,
    color: '#141515',
  },
  alreadyAccountTextThemeColor: {
    fontSize: 14,
    fontFamily: FontFamily.montserratSemiBold,
    color: '#141515',
  },
});
