import { SafeScreen } from '../../components/template';
import {
  FlatList,
  ImageBackground,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontFamily } from '../../theme/fonts';
import LinearGradient from 'react-native-linear-gradient';
import rupeeIcon from '../../theme/assets/images/rupee.png';
import filterIcon from '../../theme/assets/images/filter.png';
import cashIcon from '../../theme/assets/images/cash.png';
import game from '../../theme/assets/images/game.png';
import FastImage from 'react-native-fast-image';
import { navigate } from '../../navigators/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { walletHistory } from '../../services/game/game';
import EmptyComponent from '../../components/molecules/EmptyComponet';
import { useCallback, useEffect, useState } from 'react';
import { dealerCoinReq } from '../../services/wallet/wallet';
import { customToastMessage } from '../../utils/UtilityHelper';

const WalletScreen = props => {
  const [refreshing, setRefreshing] = useState(false);
  const [walletTotal, setWalletTotal] = useState(0)
  const [reqCoin, setReqCoin] = useState("")
  const { isSuccess, data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["wallethistory"],
    queryFn: () => {
      return walletHistory();
    },
  });
  useEffect(() => {
    if (isSuccess) {
      const total = data.transactions.reduce(
        (acc, obj) => acc + parseInt(obj.amount),
        0,
      );
      setWalletTotal(total)
    }
  }, [isSuccess])
  const _keyExtractor = (item, index) => index.toString();
  const formatDate = (isoString) => {
    // Create a Date object from the ISO string
    const date = new Date(isoString);

    // Extract date parts
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();

    // Extract time parts
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format the date and time
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${formattedDate} ${formattedTime}`;
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch()
    // Simulate a network request or some data fetching
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const reqMutation = useMutation({
    mutationFn: payload => {
      return dealerCoinReq(payload);
    },
    onSuccess: data => {
      customToastMessage(data.message, 'success');
    },
    onError: error => {
      console.log('------ERROR joinGame -----', error);
      customToastMessage(error.error ? error.error : error.message, 'error');
    },
  });
  const onPressReq = () => {
    var isValid = true;
    if (reqCoin === "") {
      isValid = false;
      setErrorReqCoin("Enter valid Amount")
    }
    if (isValid) {
      const payload = {
        amount: reqCoin
      }
      reqMutation.mutate(payload)
    }
  }
  const historyComponents = ({ item }) => {
    return (
      <>
        <View style={styles.lineStyle} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 15,
          }}>
          <View style={{ flexDirection: 'row', marginRight: 10 }}>
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
                {item.type === "deposit" ? '+' : "-"}₹ {item.amount}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: FontFamily.poppinsMedium,
                  color: '#5F646A',
                }}>
                {formatDate(item.created_at)}
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
                backgroundColor: item.type == 'deposit' ? '#21C24E' : '#C23421',
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
              {item.type}
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
            <Text style={styles.walletSubTitle}>Keep Your Coins Safe</Text>
          </View>
          <Pressable
            style={styles.rechargeButton}
            onPress={() => {
              navigate('WalletPayment', { walletTotal: walletTotal });
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
            <Text style={styles.balanceAmount}>₹ {walletTotal.toFixed(2)}</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.historyTitle}>History</Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
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
        {
          !isLoading &&
          <FlatList
            data={!!data ? data.transactions : []}
            renderItem={historyComponents}
            keyExtractor={_keyExtractor}
            listKey={(item, index) => `${index}-item`}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={() => (
              <EmptyComponent text={'No Data Founds'} image={game} />
            )}
          />
        }
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
