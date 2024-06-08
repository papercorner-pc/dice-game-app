import {SafeScreen} from '../../components/template';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FontFamily} from '../../theme/fonts';
import LinearGradient from 'react-native-linear-gradient';
import rupeeIcon from '../../theme/assets/images/rupee.png';
import filterIcon from '../../theme/assets/images/filter.png';
import cashIcon from '../../theme/assets/images/cash.png';
import FastImage from 'react-native-fast-image';
import {navigate} from '../../navigators/utils';

const WalletScreen = props => {
  const historyComponents = type => {
    return (
      <>
        <View style={styles.lineStyle} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 15,
          }}>
          <View style={{flexDirection: 'row', marginRight: 10}}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FAF1FB',
                marginRight: 10,
              }}>
              <FastImage
                source={cashIcon}
                style={{
                  height: 20,
                  width: 20,
                }}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: FontFamily.poppinsSemiBold,
                  color: '#1B1023',
                }}>
                {type == 'Debit' ? '-' : '+'}₹ 100.00
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: FontFamily.poppinsMedium,
                  color: '#5F646A',
                }}>
                26/04/2024 10:30 AM
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}>
            <View
              style={{
                height: 9,
                width: 9,
                borderRadius: 100,
                backgroundColor: type == 'Debit' ? '#C23421' : '#21C24E',
                alignSelf: 'center',
                marginRight: 5,
              }}
            />
            <Text
              style={{
                fontSize: 13,
                fontFamily: FontFamily.poppinsMedium,
                color: '#1B1023',
              }}>
              {type}
            </Text>
          </View>
        </View>
      </>
    );
  };
  return (
    <SafeScreen>
      <View style={styles.container}>
        <View style={styles.walletContainer}>
          <View>
            <Text style={styles.walletTitle}>My Wallet</Text>
            <Text>Keep Your Coins Safe</Text>
          </View>
          <Pressable
            style={styles.rechargeButton}
            onPress={() => {
              navigate('WalletPayment');
            }}>
            <Text>Recharge Wallet</Text>
          </Pressable>
        </View>
        <View style={styles.balanceContainer}>
          <LinearGradient
            colors={['#412653', '#2E1B3B']}
            style={styles.balanceGradientContainer}>
            <FastImage
              source={rupeeIcon}
              style={{
                height: 48,
                width: 48,
                marginBottom: 10,
              }}
              resizeMode="contain"
            />
            <Text style={styles.balanceTitleText}>E Wallet Balance</Text>
            <Text style={styles.balanceAmount}>₹ 1,000.00</Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.messageText}>
                Every transaction is verified for your peace of mind
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.historyTitle}>History</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <FastImage
              source={filterIcon}
              style={{
                height: 14,
                width: 12,
                marginBottom: 10,
              }}
              resizeMode="contain"
            />
          </View>
        </View>
        {historyComponents('Recharge')}
        {historyComponents('Credit')}
        {historyComponents('Debit')}
      </View>
    </SafeScreen>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  walletContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  walletTitle: {
    fontSize: 22,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#070A0D',
  },
  walletSubTitle: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
    color: '#101820',
  },
  rechargeButton: {
    backgroundColor: '#DC9C40',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  rechargeText: {
    fontSize: 12,
    fontFamily: FontFamily.poppinsMedium,
    color: '#070A0D',
  },
  balanceContainer: {
    borderRadius: 20,
    height: '30%',
    marginBottom: 20,
  },
  balanceGradientContainer: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
  },
  balanceTitleText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsRegular,
    color: '#FFF',
    marginBottom: 5,
  },
  balanceAmount: {
    fontSize: 27,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#FFF',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 12,
    fontFamily: FontFamily.poppinsRegular,
    color: '#FBFBFB',
  },
  historyTitle: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsSemiBold,
    color: '#070A0D',
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: '#E7E8E9',
    // margin: 10,
  },
});
