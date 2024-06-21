import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeScreen} from '../../../components/template';
import {goBack} from '../../../navigators/utils';
import backIcon from '../../../theme/assets/images/back.png';
import {Colors} from '../../../theme/colors';
import {FontFamily} from '../../../theme/fonts';
import searchIcon from '../../../theme/assets/images/search.png';
import dateIcon from '../../../theme/assets/images/calendar.png';
import timeIcon from '../../../theme/assets/images/time.png';
import moneyIcon from '../../../theme/assets/images/money.png';
import FastImage from 'react-native-fast-image';
import {TextInput} from 'react-native-gesture-handler';
import ButtonComponent from '../../../components/molecules/Button';
import {createGame} from '../../../services/game/game';
import {useMutation} from '@tanstack/react-query';
import {customToastMessage} from '../../../utils/UtilityHelper';
import {useState} from 'react';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const AddContest = props => {
  const date = new Date();
  const [contestName, setContestName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dateOpen, setDateOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [timeOpen, setTimeOpen] = useState(false);
  const [entryFee, setEntryFee] = useState('');
  const [entryLimit, setEntryLimit] = useState('');
  const mutation = useMutation({
    mutationFn: payload => {
      return createGame(payload);
    },
    onSuccess: data => {
      console.log('---success createGame', data);
      customToastMessage('Contest created', 'success');
      goBack();
    },
    onError: error => {
      console.log('------ERROR createGame -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
  const checkCurrentTime = () => {
    const [day, month, year] = startDate.split('/').map(Number);
    const [hours, minutes, seconds] = startTime.split(':').map(Number);

    const givenDate = new Date(year, month - 1, day, hours, minutes, seconds);

    // Get the current date and time
    const currentDate = new Date();
    const isSameDateTime = givenDate.getTime() === currentDate.getTime();
    console.log('isSameDateTime', isSameDateTime);
    if (isSameDateTime) {
      return true;
    } else {
      return false;
    }
  };
  const onAddContest = () => {
    var isValid = true;
    if (contestName === '') {
      isValid = false;
      customToastMessage('Please Enter Contest Name', 'error');
    }
    if (entryFee === '') {
      isValid = false;
      customToastMessage('Please Enter Minimum Entry Fee', 'error');
    }
    if (startTime === '') {
      isValid = false;
      customToastMessage('Please Select Start Time', 'error');
    }
    if (startDate === '') {
      isValid = false;
      customToastMessage('Please Select Start Date', 'error');
    }
    if (entryLimit === '') {
      isValid = false;
      customToastMessage('Please Enter Maximum Entry Limit', 'error');
    }
    if (checkCurrentTime()) {
      isValid = false;
      customToastMessage(
        'Not possible to create contest in current Time',
        'error',
      );
    }
    if (isValid) {
      // const fcm_token = storage.getString('fcm_token');
      const payload = {
        match_name: contestName,
        min_fee: parseFloat(entryFee),
        start_time: startTime.toString(),
        start_date: startDate.toString(),
        end_time: startTime.toString(),
        end_date: startDate.toString(),
        entry_limit: parseInt(entryLimit),
      };
      console.log('payload=', payload);
      mutation.mutate(payload);
    }
  };
  return (
    <SafeScreen>
      <View style={{flexDirection: 'row', height: 48}}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            goBack();
          }}>
          <Image
            style={{height: 24, width: 24, marginRight: 24}}
            source={backIcon}
            resizeMode="contain"
            // tintColor={'#FBFBFB'}
          />
        </TouchableOpacity>
        <View style={styles.mainHeadingContainer}>
          <Text style={styles.headingText}>New Contest</Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 6,
            backgroundColor: '#EEEDED',
          }}>
          <Text style={styles.contestInfoText}>Contest Information</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Contest Name</Text>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder={'Enter'}
              style={styles.input}
              value={contestName}
              onChangeText={setContestName}
            />
          </View>
          <Text style={styles.text}>Start Date</Text>
          <View style={styles.searchContainer}>
            <FastImage
              source={dateIcon}
              style={{
                height: 14,
                width: 14,
                //   marginHorizontal: 2,
              }}
              resizeMode="contain"
            />
            <TextInput
              placeholder={'Select start date'}
              style={styles.input}
              value={startDate.toString()}
              onFocus={() => {
                setDateOpen(true);
              }}
            />
          </View>
          <Text style={styles.text}>Start Time</Text>
          <View style={styles.searchContainer}>
            <FastImage
              source={timeIcon}
              style={{
                height: 14,
                width: 14,
                //   marginHorizontal: 2,
              }}
              resizeMode="contain"
            />
            <TextInput
              placeholder={'Select start time'}
              style={styles.input}
              value={startTime.toString()}
              onFocus={() => {
                setTimeOpen(true);
              }}
            />
          </View>
          <Text style={styles.text}>Entry Fee</Text>
          <View
            style={[styles.searchContainer, {justifyContent: 'space-between'}]}>
            <TextInput
              placeholder={'Enter'}
              style={styles.input}
              keyboardType={'number-pad'}
              value={entryFee}
              onChangeText={setEntryFee}
            />
            <FastImage
              source={moneyIcon}
              style={{
                height: 14,
                width: 14,
                marginLeft: -15,
              }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.text}>Entry Limit</Text>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder={'Enter'}
              style={styles.input}
              keyboardType={'number-pad'}
              value={entryLimit}
              onChangeText={setEntryLimit}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <ButtonComponent
          wrapperStyles={styles.checkoutContainer}
          textStyles={styles.buttonText}
          text={'Create Contest'}
          onPress={onAddContest}
          buttonColor={'#DC9C40'}
        />
      </View>
      <DatePicker
        modal
        open={dateOpen}
        date={date}
        onConfirm={date => {
          console.log('date==', date);
          setDateOpen(false);
          const formateDate = moment(date).format('DD/MM/YYYY');
          setStartDate(formateDate);
        }}
        onCancel={() => {
          setDateOpen(false);
        }}
        mode={'date'}
        minimumDate={date}
      />
      <DatePicker
        modal
        open={timeOpen}
        date={date}
        onConfirm={date => {
          setTimeOpen(false);
          const formateTime = moment(date).format('HH:mm:ss');
          setStartTime(formateTime);
        }}
        onCancel={() => {
          setTimeOpen(false);
        }}
        mode={'time'}
        // minimumDate={date}
      />
    </SafeScreen>
  );
};

export default AddContest;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 15,
    top: 15,
  },
  mainHeadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsMedium,
    color: '#000',
  },
  contestInfoText: {
    fontSize: 13,
    fontFamily: FontFamily.poppinsMedium,
    color: '#333333',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 15,
  },
  searchContainer: {
    borderRadius: 12,
    borderColor: '#C4BCCA',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    marginVertical: 8,
  },
  input: {
    height: 50, // Adjust height as needed
    paddingVertical: 0, // Remove vertical padding
    paddingHorizontal: 10, // Adjust horizontal padding
    fontSize: 14, // Adjust font size as needed
    lineHeight: 18, // Adjust line height as needed
    width: '100%',
    color:Colors.black
  },
  text: {
    fontSize: 15,
    fontFamily: FontFamily.poppinsMedium,
    color: '#333333',
  },
  bottomContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 20,
    shadowColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 8,
    borderColor: Colors.borderColor,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    backgroundColor: '#EEEDED',
  },
  checkoutContainer: {
    marginHorizontal: 14,
    marginBottom: 10,
    width: '95%',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
    color: '#070A0D',
  },
});
