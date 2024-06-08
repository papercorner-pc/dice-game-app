import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import OTPTextView from 'react-native-otp-textinput';
import ButtonComponent from '../../components/molecules/Button';
import {SafeScreen} from '../../components/template';
import {goBack} from '../../navigators/utils';
import backIcon from '../../theme/assets/images/back.png';
import {FontFamily} from '../../theme/fonts';
import {paymentMethodListData} from '../../utils/constants';

function WalletPaymentScreen() {
  const [paymentListData, setPaymentListData] = useState(paymentMethodListData);
  const _keyExtractor = (item, index) => index.toString();

  const onPressPaymentMethod = item => {
    const paymentList = [...paymentListData];
    const updatePaymentList = paymentList.map?.(itemValue => {
      const selectedItem = {...itemValue};
      selectedItem.isSelected = false;
      if (selectedItem.id == item.id) {
        selectedItem.isSelected = true;
      }
      return selectedItem;
    });
    setPaymentListData(updatePaymentList);
  };

  const renderPaymentMethod = ({item}) => {
    return (
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Pressable style={styles.radioButton} onPress={onPressPaymentMethod}>
          {item.isSelected && <View style={styles.radioButtonSelected} />}
        </Pressable>
        <Text
          style={{
            fontSize: 15,
            fontFamily: FontFamily.poppinsMedium,
            color: '#333333',
          }}>
          {item.title}
        </Text>
      </View>
    );
  };
  return (
    <SafeScreen>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            goBack();
          }}>
          <Image
            style={{height: 24, width: 24, marginRight: 24}}
            source={backIcon}
            resizeMode="contain"
            tintColor={'#FBFBFB'}
          />
        </TouchableOpacity>
        <Text style={styles.titleText}>Payment</Text>
      </View>
      <View style={{padding: 15, flex: 1, backgroundColor: '#EEEDED'}}>
        <View style={styles.balanceContainer}>
          <LinearGradient
            colors={['#412653', '#2E1B3B']}
            style={styles.balanceGradientContainer}>
            <Text style={styles.balanceTitleText}>E Wallet Balance</Text>
            <Text style={styles.balanceAmount}>₹ 1,000.00</Text>
            <Text style={styles.enterText}>
              Enter amount you want to invest
            </Text>
            <View style={styles.enterContainer}>
              <OTPTextView
                containerStyle={styles.textInputContainer}
                textInputStyle={styles.otpInputContainer}
                tintColor={'#333333'}
                handleTextChange={() => {}}
                inputCount={6}
                keyboardType="numeric"
              />
            </View>
          </LinearGradient>
        </View>
        <View style={styles.paymentOptionContainer}>
          <Text
            style={{
              fontSize: 13,
              fontFamily: FontFamily.poppinsMedium,
              color: '#5F646A',
              marginBottom: 10,
            }}>
            Debit From
          </Text>
          <FlatList
            data={paymentListData}
            renderItem={renderPaymentMethod}
            keyExtractor={_keyExtractor}
            // scrollEnabled={false}
            listKey={(item, index) => `${index}-item`}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <ButtonComponent
          buttonColor="#DC9C40"
          wrapperStyles={{
            marginBottom: 10,
          }}
          textStyles={{
            color: '#070A0D',
            fontSize: 16,
            fontFamily: FontFamily.poppinsMedium,
          }}
          text={'Continue'}
          onPress={() => {}}
        />
      </View>
    </SafeScreen>
  );
}

export default WalletPaymentScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: '15%',
    backgroundColor: '#3B234C',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsMedium,
    color: '#FBFBFB',
  },
  balanceContainer: {
    height: 184,
    marginBottom: 20,
  },
  balanceGradientContainer: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
  },
  balanceTitleText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium,
    color: '#FFF',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 20,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#FFF',
    marginBottom: 15,
  },
  enterText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsRegular,
    color: '#FFF',
    marginBottom: 5,
  },
  enterContainer: {
    height: 45,
    borderRadius: 8,
    backgroundColor: '#F8EAF9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    marginBottom: 30,
  },
  otpInputContainer: {
    width: 22,
  },
  paymentOptionContainer: {
    height: 160,
    borderRadius: 20,
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 30,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#21C24E',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    height: 15,
    width: 15,
    backgroundColor: '#21C24E',
    borderRadius: 100,
  },
});
