import {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ButtonComponent from '../../components/molecules/Button';
import {SafeScreen} from '../../components/template';
import {goBack, navigate} from '../../navigators/utils';
import backIcon from '../../theme/assets/images/back.png';
import {FontFamily} from '../../theme/fonts';

const PrivacyPolicyScreen = props => {
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  return (
    <SafeScreen>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            goBack();
          }}>
          <Image
            style={{height: 24, width: 24, marginRight: 24}}
            source={backIcon}
            resizeMode="contain"
            tintColor={'#070A0D'}
          />
        </TouchableOpacity>
        <View style={styles.mainHeadingContainer}>
          <Text style={styles.headingText}>Privacy Policy</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={{paddingHorizontal: 15, paddingVertical: 8}}>
          <Text style={styles.profileText}>Effective date: April 1, 2024</Text>
        </View>
        <View style={styles.inputMainContainer}>
          <Text style={styles.mainText}>
            This Privacy Policy describes how [Company Name] ("we", "us", or
            "our") collects, uses, and discloses information about you when you
            use our website [www.example.com] (the "Service").
          </Text>
          <Text style={styles.mainText}>
            We use your data to provide and improve the Service. By using the
            Service, you agree to the collection and use of information in
            accordance with this policy.
          </Text>
          <Text style={styles.mainText}>
            Information Collection and Use We collect several different types of
            information for various purposes to provide and improve our Service
            to you.
          </Text>
          <Text style={styles.mainText}>Types of Data Collected</Text>
          <Text style={styles.mainText}>
            Personal Data While using our Service, we may ask you to provide us
            with certain personally identifiable information that can be used to
            contact or identify you ("Personal Data"). Personally identifiable
            information may include, but is not limited to:
          </Text>
          <Text style={styles.mainText}>
            Email address First name and last name Phone number Address, State,
            Province, ZIP/Postal code, City Cookies and Usage Data
          </Text>
        </View>
      </View>
    </SafeScreen>
  );
};

export default PrivacyPolicyScreen;

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
  mainText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsRegular,
    color: '#333333',
    marginBottom: 10,
  },
});
