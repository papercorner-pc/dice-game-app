import {StyleSheet, Text, View} from 'react-native';
import {SafeScreen} from '../../components/template';
import {Colors} from '../../theme/colors';
import verify from '../../theme/assets/images/verify.png';
import FastImage from 'react-native-fast-image';
import {FontFamily} from '../../theme/fonts';
import ButtonComponent from '../../components/molecules/Button';
import { navigate } from '../../navigators/utils';

const OtpVerifiedScreen = props => {
  return (
    <SafeScreen>
      <View style={styles.container}>
        <FastImage
          source={verify}
          style={{
            width: 180,
            height: 180,
            marginBottom: 20,
          }}
          resizeMode="contain"
        />
        <Text style={styles.mainText}>Verification Completed</Text>
        <Text style={styles.subText}>Your Phone number has been verified.</Text>
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
          onPress={() => {
            navigate('HomeRoot');
          }}
        />
      </View>
    </SafeScreen>
  );
};

export default OtpVerifiedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  mainText: {
    fontSize: 24,
    fontFamily: FontFamily.poppinsBold,
    color: '#000000',
    marginBottom: 10,
  },
  subText: {
    fontSize: 13,
    fontFamily: FontFamily.poppinsRegular,
    color: '#000000',
    marginBottom: 50,
  },
});
