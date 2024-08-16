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
import { goBack, navigate } from '../../navigators/utils';
import { updateProfile } from '../../services/users/users';
import backIcon from '../../theme/assets/images/back.png';
import { Colors } from '../../theme/colors';
import { FontFamily } from '../../theme/fonts';
import { customToastMessage, validatePhone } from '../../utils/UtilityHelper';

const EditProfile = props => {
  const { name, phone } = props.route.params;
  const [userName, setUserName] = useState(name);
  const [phoneNo, setPhoneNo] = useState(phone);
  const mutation = useMutation({
    mutationFn: payload => {
      return updateProfile(payload);
    },
    onSuccess: data => {
      console.log('---success updateProfile', data);
      customToastMessage('Profile Updated', 'success');
      goBack();
    },
    onError: error => {
      console.log('------ERROR updateProfile -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
  const onPressUpdate = () => {
    var isValid = true;
    if (userName === '') {
      isValid = false;
      customToastMessage('Please Enter User Name', 'error');
    }
    if (isValid) {
      const payload = {
        "name": userName,
        "phone_number": ""
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
          <Text style={styles.headingText}>Edit Profile</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 15, paddingVertical: 8 }}>
          <Text style={styles.profileText}>Profile</Text>
        </View>
        <View style={styles.inputMainContainer}>
          <Text style={styles.inputText}>User Name</Text>
          <TextInput
            placeholder={'Nandu'}
            onChangeText={setUserName}
            value={userName}
            style={styles.inputContainer}
          />
        </View>
        {/* <View style={{ paddingHorizontal: 15 }}>
          <Text style={styles.profileText}>Contact Details</Text>
        </View>
        <View style={[styles.inputMainContainer, { marginBottom: 50 }]}>
          <Text style={styles.inputText}>Contact Number</Text>
          <TextInput
            placeholder={'+91 000 0000 000'}
            onChangeText={setPhoneNo}
            value={phoneNo}
            style={styles.inputContainer}
          />
        </View> */}
        <View style={{ paddingHorizontal: 15 }}>
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
            text={'Update'}
            onPress={onPressUpdate}
          />
        </View>
      </View>
    </SafeScreen>
  );
};

export default EditProfile;

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
    width: '100%',
    color: Colors.black
  },
});
