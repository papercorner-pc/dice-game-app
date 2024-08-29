import { SafeScreen } from '../../components/template';
import LinearGradient from 'react-native-linear-gradient';
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import gameIcon from '../../theme/assets/images/game.png';
import flagIcon from '../../theme/assets/images/flag.png';
import eyeIcon from '../../theme/assets/images/eye.png';
import { FontFamily } from '../../theme/fonts';
import CustomTextInput from '../../components/molecules/TextInput';
import { useState } from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ButtonComponent from '../../components/molecules/Button';
import { goBack, navigate } from '../../navigators/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAccount } from '../../services/auth/auth';
import {
  customToastMessage,
  validatePassword,
  validatePhone,
} from '../../utils/UtilityHelper';
import { Colors } from '../../theme/colors';
import { storage } from '../../App';

const CreateAccount = (props) => {
  const { type } = props.route.params;
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const mutation = useMutation({
    mutationFn: payload => {
      return createAccount(payload);
    },
    onSuccess: data => {
      console.log('---success', data);
      customToastMessage(data.message, 'success');
      goBack()
      // queryClient.invalidateQueries("movies");
    },
    onError: error => {
      console.log('------ERRORq123-----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
  const onPressCreateAccount = () => {
    var isValid = true;
    if (!validatePassword(password)) {
      isValid = false;
      customToastMessage('Please enter valid Password', 'error');
    }
    if (name === '') {
      isValid = false;
      customToastMessage('Please enter User Name', 'error');
    }
    if (isValid) {
      const payload = {
        username: name,
        password: password,
        type: type
      };
      mutation.mutate(payload);
    }
  };
  return (
    // <ScrollView>
    <SafeScreen>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ height: '40%' }}>
            <LinearGradient colors={['#412653', '#2E1B3B']} style={{ flex: 1 }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
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
              top: -90,
              borderRadius: 40,
              padding: 10,
            }}>
            <View style={{ marginTop: 30, marginBottom: 15 }}>
              <Text
                style={{
                  fontSize: 27,
                  fontFamily: FontFamily.montserratSemiBold,
                  color: '#070A0D',
                  textTransform: "capitalize"
                }}>
                Create {type}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: FontFamily.montserratRegular,
                  color: '#070A0D',
                }}>
                Rummy Fever community!
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: FontFamily.montserratRegular,
                color: '#0B1117',
              }}>
              Create your account and start playing. It's quick and easy!
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
                  marginBottom: 20,
                }}>
                <TextInput
                  placeholder={'Enter password'}
                  onChangeText={setPassword}
                  value={password}
                  style={{
                    padding: 10,
                    width: '100%',
                    color: Colors.black
                  }}
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
                  fontFamily: FontFamily.poppinsRegular,
                }}
                text={'SignUp'}
                onPress={onPressCreateAccount}
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
                  Already have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigate('SignIn');
                  }}>
                  <Text
                    style={{
                      color: '#7D447F',
                      fontSize: 14,
                      fontFamily: FontFamily.montserratMedium,
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
    // </ScrollView>
  );
};

export default CreateAccount;
